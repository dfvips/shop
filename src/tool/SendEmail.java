package tool;

import org.apache.commons.mail.HtmlEmail;

public class SendEmail {
	
	public static boolean sendEmail(String emailaddress,String code,int id){
		try {
			HtmlEmail email = new HtmlEmail();//���ø���
//			email.setHostName("smtp.qq.com");//��Ҫ�޸ģ�126����Ϊsmtp.126.com,163����Ϊ163.smtp.com��QQΪsmtp.qq.com
//			email.setCharset("UTF-8");
//			email.addTo(emailaddress);// �ռ���ַ
//			email.setSSLOnConnect(true);
//			email.setSSLCheckServerIdentity(true);
//			email.setSmtpPort(587);
////			email.setSslSmtpPort("587");
//			email.setFrom("dfvips@qq.com", "dreamfly");//�˴��������ַ���û���,�û�������������д
//			
//			email.setAuthentication("dfvips@qq.com", "jwjnxnluxpsldaie");//�˴���д�����ַ�Ϳͻ�����Ȩ��
			email.setHostName("smtp.qiye.aliyun.com");//��Ҫ�޸ģ�126����Ϊsmtp.126.com,163����Ϊ163.smtp.com��QQΪsmtp.qq.com
			email.setCharset("UTF-8");
			email.addTo(emailaddress);// �ռ���ַ
			email.setSSLOnConnect(true);
			email.setSSLCheckServerIdentity(true);
			email.setSmtpPort(465);
//			email.setSslSmtpPort("587");
			email.setFrom("admin@dfvips.com", "dreamfly");//�˴��������ַ���û���,�û�������������д
			email.setAuthentication("admin@dfvips.com", "chen467663655.+");//�˴���д�����ַ�Ϳͻ�����Ȩ��
			
			
 
			email.setSubject("DreamFly�ֻ��̳�");//�˴���д�ʼ������ʼ�����������д
			
			if(id==0){
				email.setMsg("<h2>�𾴵��û���</h2>"+
						 
				"<p style='text-indent:2em;display:block;margin-top:30px'>�������޸��˺���Ϣ����֤���� <strong>"+code+"</strong>��������Ա������ȡ������й©��</p>" +
				"<p style='display:block;margin-top:30px'>����</p>"
				+"<p>���� DreamFly�ֻ��̳�</p>"
						);//�˴���д�ʼ�����
			}else{
				email.setMsg("<h2>�𾴵��û���</h2>"+
						 
				"<p style='text-indent:2em;display:block;margin-top:30px'>��¼/ע��DreamFly�ֻ��̳ǣ���֤���� <strong>"+code+"</strong>������ת����ע�Ὣ�󶨴˰�ȫ���䡣</p>" +
				"<p style='display:block;margin-top:30px'>����</p>"
				+"<p>���� DreamFly�ֻ��̳�</p>"
						);//�˴���д�ʼ�����
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
