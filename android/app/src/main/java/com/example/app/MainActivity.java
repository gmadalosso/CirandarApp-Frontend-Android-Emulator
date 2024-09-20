package com.example.app;

import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.util.Log; // Import logging

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Get the WebView from Capacitor's bridge
    WebView webView = getBridge().getWebView();

    // Enable cookies in WebView
    CookieManager cookieManager = CookieManager.getInstance();
    cookieManager.setAcceptCookie(true); // Enable general cookies

    // Enable third-party cookies for Android 5.0 (API 21) and higher
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      cookieManager.setAcceptThirdPartyCookies(webView, true);
    }

    // Log the current cookies for the WebView to ensure they are present
    String cookies = cookieManager.getCookie("http://10.0.2.2:5001");
    Log.d("MainActivity", "Cookies for 10.0.2.2: " + cookies); // Log cookies

    // Enable mixed content (HTTP content over HTTPS)
    WebSettings webSettings = webView.getSettings();
    webSettings.setJavaScriptEnabled(true); // Enable JavaScript
    webSettings.setDomStorageEnabled(true); // Enable DOM storage
    webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW); // Allow mixed content

    // Log WebView settings
    Log.d("MainActivity", "JavaScript Enabled: " + webSettings.getJavaScriptEnabled());
    Log.d("MainActivity", "DOM Storage Enabled: " + webSettings.getDomStorageEnabled());
    Log.d("MainActivity", "Mixed Content Mode: " + webSettings.getMixedContentMode());

    // Check if cookies are enabled
    boolean cookiesEnabled = cookieManager.acceptCookie();
    Log.d("MainActivity", "Cookies enabled: " + cookiesEnabled);

    // Check if third-party cookies are enabled
    boolean thirdPartyCookiesEnabled = cookieManager.acceptThirdPartyCookies(webView);
    Log.d("MainActivity", "Third-party cookies enabled: " + thirdPartyCookiesEnabled);

    // Optionally enable WebView debugging for development
    WebView.setWebContentsDebuggingEnabled(true);
  }
}
