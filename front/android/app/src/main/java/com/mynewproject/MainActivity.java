// 백그라운드 까지 구현해 놓은 코드
package com.mynewproject;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.facebook.react.ReactActivity;

import java.util.ArrayList;
import java.util.List;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;


public class MainActivity extends ReactActivity {
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1; // 위치 권한 요청 코드
    private GeofencingClient geofencingClient; // 지오펜싱 클라이언트
    private List<Geofence> geofenceList; // 지오펜스 리스트
    private static final int PERMISSION_REQUEST_CODE = 100; // 권한 요청 코드 추가


    @Override
    protected String getMainComponentName() {
        return "MyNewProject"; // 프로젝트 이름
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Google Play Services 가용성 확인
        GoogleApiAvailability apiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = apiAvailability.isGooglePlayServicesAvailable(this);
        
        if (resultCode == ConnectionResult.SUCCESS) {
            Log.d("Geofencing", "Google Play Services is available.");
            
            // 초기화
            geofencingClient = LocationServices.getGeofencingClient(this);
            geofenceList = new ArrayList<>();

            // 테스트용 지오펜싱 영역 추가
            addTestGeofence();

            requestLocationPermission(); // 위치 권한 요청
        } else {
            Log.e("Geofencing", "Google Play Services not supported or available");
            Toast.makeText(this, "Google Play Services가 필요합니다.", Toast.LENGTH_SHORT).show();
            // 필요한 경우 앱 종료 또는 다른 처리
            return; // Google Play Services가 사용할 수 없는 경우, 나머지 로직을 실행하지 않음
        }
    }

        private void requestLocationPermission() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_BACKGROUND_LOCATION
            }, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            startForegroundService(); // 권한이 허용된 경우 포그라운드 서비스 시작
            addGeofences(); // 권한이 허용된 경우 지오펜스 추가
        }
    }


    private void startForegroundService() {
        Intent serviceIntent = new Intent(this, LocationForegroundService.class);
        ContextCompat.startForegroundService(this, serviceIntent);
    }

    private void addTestGeofence() {
        Log.d("Geofence", "Adding test geofence");
        geofenceList.add(new Geofence.Builder()
                .setRequestId("Guro")
                .setCircularRegion(37.4864996, 126.8934724, 1000) 
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build());
        
        geofenceList.add(new Geofence.Builder()
        .setRequestId("lotte") // 새로운 지오펜스의 고유 ID
        .setCircularRegion(37.512464099999995, 127.10254300000001, 1000) // 고정된 위치로 설정
        .setExpirationDuration(Geofence.NEVER_EXPIRE) // 만료되지 않도록 설정
        .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT) // 진입 및 이탈 이벤트
        .build());

        Log.d("GeofencingAdd", "New geofence added: " + geofenceList.size());
    }

    private GeofencingRequest getGeofencingRequest() {
        GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER);
        builder.addGeofences(geofenceList);
        return builder.build();
    }


        private PendingIntent getGeofencePendingIntent() {
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        intent.setAction("com.google.android.gms.location.Geofence"); // 액션을 맞춰주기

        return PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_MUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }



        private void addGeofences() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_BACKGROUND_LOCATION}, PERMISSION_REQUEST_CODE);
        } else {
            Log.d("Geofencing", "Adding geofences with permissions granted");
            geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
                .addOnSuccessListener(this, aVoid -> {
                    Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
                })
                .addOnFailureListener(this, e -> {
                    String errorMessage = "지오펜싱 추가 실패: " + e.getMessage();
                    Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                    Log.e("GeofencingError", errorMessage);
                });
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startForegroundService(); // 권한이 허용되면 서비스 시작
                addGeofences(); // 지오펜스 추가
            } else {
                Toast.makeText(this, "위치 권한이 필요합니다.", Toast.LENGTH_SHORT).show();
            }
        }
    }
}