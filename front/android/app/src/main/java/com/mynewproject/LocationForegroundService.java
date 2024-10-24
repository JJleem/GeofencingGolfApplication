// json 전송
package com.mynewproject;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactApplication;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.facebook.react.modules.core.DeviceEventManagerModule; // 추가된 import
import com.facebook.react.bridge.ReactContext;


public class LocationForegroundService extends Service {

    private static final int NOTIFICATION_ID = 1;
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private ReactContext reactContext;

    private boolean isCheck;
    private String requestId;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel(); // 알림 채널 생성
        Notification notification = createNotification();
        startForeground(NOTIFICATION_ID, notification);

        // 위치 업데이트 초기화
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        startLocationUpdates();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("location_channel",
                    "Location Service Channel",
                    NotificationManager.IMPORTANCE_HIGH);
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification createNotification() {
        return new NotificationCompat.Builder(this, "location_channel")
                .setContentTitle("Location Service")
                .setContentText("Tracking location in the background")
                .setSmallIcon(R.mipmap.ic_launcher) // 알림 아이콘 설정
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            // isCheck 값 업데이트
            if (intent.hasExtra("isCheck")) {
                boolean checkValue = intent.getBooleanExtra("isCheck", false);
                updateIsCheck(checkValue); // isCheck 값 업데이트
                Log.d("LocationForegroundService", "isCheck 값 업데이트: " + checkValue);
            }

            // requestId 값 업데이트
            if (intent.hasExtra("requestId")) {
                requestId = intent.getStringExtra("requestId");
                Log.d("LocationForegroundService", "requestId 값 업데이트: " + requestId);
            }
        }
        return START_STICKY;
    }

    private void startLocationUpdates() {
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(3000); // 3초 간격
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY); // GPS 사용

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult != null) {
                    for (Location location : locationResult.getLocations()) {
                        Log.d("LocationUpdate", "위치 업데이트: " + location.getLatitude() + ", " + location.getLongitude());
                        // Toast.makeText(LocationForegroundService.this, "현재 위치: " + location.getLatitude() + ", " + location.getLongitude(), Toast.LENGTH_SHORT).show();
                        
                       // 위치 데이터를 JSON 객체로 변환하여 React Native로 전송
                        String json = "{\"latitude\": " + location.getLatitude() +
                                    ", \"longitude\": " + location.getLongitude() +
                                    ", \"altitude\": " + location.getAltitude() +
                                    ", \"accuracy\": " + location.getAccuracy() +
                                    ", \"speed\": " + location.getSpeed() +
                                    ", \"bearing\": " + location.getBearing() +
                                    ", \"time\": " + location.getTime() + 
                                    ", \"isCheck\": " + isCheck + 
                                    ", \"requestId\": \"" + requestId + "\"}";
                        sendLocationToReactNative(json); // 여기서 JSON 문자열을 전송
                    }
                } else {
                    Log.e("LocationUpdate", "현재 위치를 찾을 수 없습니다.");
                }
            }
        };

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
    }

    private void sendLocationToReactNative(String json) {
        ReactApplication context = (ReactApplication) getApplicationContext();
        // React Native의 현재 ReactContext를 가져옵니다.
        ReactContext reactContext = context.getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
        
        if (reactContext != null) {
            // React Native의 EventEmitter를 통해 전송
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("LocationUpdate", json);
        } else {
            Log.e("LocationForegroundService", "React Native context가 null입니다. 위치 데이터를 전송할 수 없습니다.");
        }
    }

    public void updateIsCheck(boolean value) {
        this.isCheck = value; // isCheck 값 업데이트
    }
    

    // @Override
    // public void onTaskRemoved(Intent rootIntent) {
    //     super.onTaskRemoved(rootIntent);
    //     // 태스크가 제거될 때 호출되는 코드
    //     Log.d("LocationService", "위치 업데이트가 중지되었습니다.");

    //     // 자원 정리 코드 (예: 데이터 저장, 스레드 종료 등)
    //     stopSelf(); // 서비스 종료
    // }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}