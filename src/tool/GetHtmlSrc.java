package tool;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;


public class GetHtmlSrc {
    
    public static String GetHtml(String htmlUrl){
  	  String result = null;
      try{
			CloseableHttpClient httpClient=HttpClients.createDefault();
			HttpGet httpGet=new HttpGet(htmlUrl);
			httpGet.setHeader("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
			CloseableHttpResponse response=httpClient.execute(httpGet);
			HttpEntity entity=response.getEntity(); 
			result=EntityUtils.toString(entity);
			response.close(); 
			httpClient.close(); 
      }catch (IOException e) {
      	System.out.println("你输入的URL格式有问题！请仔细输��?");
      }    
		return result;

  } 
    public static String PostHtml(String htmlUrl){
    	  String result = null;
        try{
  			CloseableHttpClient httpClient=HttpClients.createDefault();
  			HttpPost httpPost=new HttpPost(htmlUrl);
  			httpPost.setHeader("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
  			CloseableHttpResponse response=httpClient.execute(httpPost);
  			HttpEntity entity=response.getEntity(); 
  			result=EntityUtils.toString(entity);
  			response.close(); 
  			httpClient.close(); 
        }catch (IOException e) {
        	System.out.println("你输入的URL格式有问题！请仔细输��?");
        }    
  		return result;

    } 
}