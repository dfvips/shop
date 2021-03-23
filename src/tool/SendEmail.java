package tool;

import org.apache.commons.mail.HtmlEmail;

public class SendEmail {
	
	public static boolean sendEmail(String emailaddress,String code,int id){
		try {
			HtmlEmail email = new HtmlEmail();//不用更改
//			email.setHostName("smtp.qq.com");//需要修改，126邮箱为smtp.126.com,163邮箱为163.smtp.com，QQ为smtp.qq.com
//			email.setCharset("UTF-8");
//			email.addTo(emailaddress);// 收件地址
//			email.setSSLOnConnect(true);
//			email.setSSLCheckServerIdentity(true);
//			email.setSmtpPort(587);
////			email.setSslSmtpPort("587");
//			email.setFrom("dfvips@qq.com", "dreamfly");//此处填邮箱地址和用户名,用户名可以任意填写
//			
//			email.setAuthentication("dfvips@qq.com", "jwjnxnluxpsldaie");//此处填写邮箱地址和客户端授权码
			email.setHostName("smtp.qiye.aliyun.com");//需要修改，126邮箱为smtp.126.com,163邮箱为163.smtp.com，QQ为smtp.qq.com
			email.setCharset("UTF-8");
			email.addTo(emailaddress);// 收件地址
			email.setSSLOnConnect(true);
			email.setSSLCheckServerIdentity(true);
			email.setSmtpPort(465);
//			email.setSslSmtpPort("587");
			email.setFrom("admin@dfvips.com", "dreamfly");//此处填邮箱地址和用户名,用户名可以任意填写
			email.setAuthentication("admin@dfvips.com", "chen467663655.+");//此处填写邮箱地址和客户端授权码
			
			
 
			email.setSubject("DreamFly手机商城");//此处填写邮件名，邮件名可任意填写
			
			if(id==0){
				email.setMsg("<h2>尊敬的用户：</h2>"+
						 
				"<p style='text-indent:2em;display:block;margin-top:30px'>您正在修改账号信息，验证码是 <strong>"+code+"</strong>，工作人员不会索取，请勿泄漏。</p>" +
				"<p style='display:block;margin-top:30px'>此致</p>"
				+"<p>来自 DreamFly手机商城</p>"
						);//此处填写邮件内容
			}else{
				email.setMsg("<h2>尊敬的用户：</h2>"+
						 
				"<p style='text-indent:2em;display:block;margin-top:30px'>登录/注册DreamFly手机商城，验证码是 <strong>"+code+"</strong>，请勿转发。注册将绑定此安全邮箱。</p>" +
				"<p style='display:block;margin-top:30px'>此致</p>"
				+"<p>来自 DreamFly手机商城</p>"
						);//此处填写邮件内容
			}
			email.send();
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
}
