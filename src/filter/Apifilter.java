package filter;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class apifilter
 */
@WebFilter(dispatcherTypes = {
		DispatcherType.REQUEST, 
		DispatcherType.FORWARD,
		DispatcherType.INCLUDE
		},servletNames = { 
			"AddAndCut", 
			"AddToCar", 
			"CheckUser",
			"DeleteGoods",
			"Findpwd",
			"Getcode",
			"Getgoodsmsg", 
			"Search",
			"Searchgoods",
			"ShowCar",
			"ShowOrder",
			"TakeOrder",
			"Updateusermsg"
		})
public class Apifilter implements Filter {

    /**
     * Default constructor. 
     */
    public Apifilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		PrintWriter out = res.getWriter();
		String referer = req.getHeader("Referer");
		if (referer == null || (!referer.startsWith("http://localhost")&&!referer.startsWith("https://localhost")&&!referer.startsWith("https://shop.dfvips.com")&&!referer.startsWith("https://dfvips.com")&&!referer.startsWith("https://www.dfvips.com")&&!referer.startsWith("http://www.dfvips.com")&&!referer.startsWith("http://shop.dfvips.com")&&!referer.startsWith("http://dfvips.com"))) {
			out.println("{\"state\":\"∑«∑®∑√Œ \"}");
		}else{
			chain.doFilter(request, response);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	@Override
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
