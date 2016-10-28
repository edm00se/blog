---
layout: post
type: post
title: "Servlet Basics"
description: "an introduction"
category: xpages-servlets
series: servlet-series
tags: [xpages, domino, java, servlet]
modified: 2015-02-16
comments: true
share: true
---

{% include series.html %}
#### Preface
This post is essentially the first two parts of the several I've already identified I'll be blogging about. I kept waffling between wanting the first three in one post, which would have been huge, and just one, which would have been short. Here's what I came up with. You can also keep track of this and the other parts of the series on the [servlet series]({{ site.url}}/servlet-series/) page.

### A Series on Servlets
This is the first post in [a short series on servlets]({{ site.url}}/servlet-series) I'll be posting over the next month or two. It's going to take some time to go through, but I hope you'll stick with me through to the end. I was originally going to speed through the whole process and give a lengthy one-shot, one-kill post on the topic; but servlets, while simple in nature, can be complex depending on your implementation. I've learned a couple things since I started assembling and hopefully this will be useful to some out there.

### What Is A Servlet?
In case you haven't run into the term before, [a servlet is](http://docs.oracle.com/javaee/5/tutorial/doc/bnafe.html), semantically, a portmanteau of the words server and applet. This stems from the origins of Java dating to the early years of many of the conventions that we take for granted now, in terms of web technology. Functionally speaking, a servlet is a registered Class which connects via URI to provide or consume _something_; this can be data (XML, JSON, others), messages (e.g.- plain text), or more.

#### What Does That Mean for Me?
Many XPage developers have found great power in the use of [XAgents](http://www.wissel.net/blog/d6plinks/shwl-7mgfbn). They can be powerful and flexible to meet our needs. The primary reason for this is the ability to hijack the response output writer, and return our own data, in whatever (content-type) format we specify. This makes things seamless to the user; e.g.- buildMyContacts.xsp can yield a myContacts.csv file, downloaded as an attachment, with the current/live data. Servlets let us do essentially the same thing; they provide an end point (instead of buildMyContacts.xsp we may have /api/mycontacts), which lets us return data in the format we want (setting the response content-type, accepting certain types, etc.), in a generally seamless fashion (current data).

#### But I Heard XAgents Are Bad?
One of the minor themes at ConnectED for those of us in the developer crowd was that XAgents bring along some unnecessary baggage for a simple data response; specifically [the JSF life cycle](//docs.oracle.com/javaee/5/tutorial/doc/bnaqq.html). This isn't exactly "bad" so much as just a set of unnecessary executions performed when the response could just be built and sent after requested. The JSF life cycle is there for us to assist in building out the tags for an HTML page, provide the data bindings, and set and handle the state of the page and its bound data elements. With a servlet, you choose the response format, making it focus only on hooking in to your code (via [_javax.servlet.http.HttpServlet_](http://docs.oracle.com/javaee/5/api/javax/servlet/http/HttpServlet.html)).

### Flavors of Servlets
So far as I can tell, there are essentially three ways of creating a servlet on a Domino server. I should mention that I'm focusing on application servlets, with no server-level deployment. The flavors are boiled down to (vanilla) _HttpServlet_, _DesignerFacesServlet_, and an abstracted servlet, which uses a wrapper to handle some of the frequent tedium (why we abstract any code). I'll try to identify why you might use each, with a brief description.

Note: I'm not covering implementation in this post, that will be covered in the next post. Each of the "flavors" outlined below share two steps in the implementation, so I'm attempting to differentiate each now, before cramming them all into an application together.

#### HttpServlet
Probably the easiest to implement, to write the servlet, one must write a class which extends <span data-toggle="tooltip" title="javax.servlet.http.HttpServlet">_HttpServlet_</span>. This class can contain override methods for init and destroy and exposes the methods (VERBs such as GET, POST, PUT, and DELETE) available via _do*_ methods (_doGet_, _doPost_, _doPut_, and _doDelete_). A servlet needs to provide its response in either a response writer or output stream. Have a look, this is a fully functioning, albeit simple, servlet.

```java
package com.hello.servlets;

import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Example Servlet, implemented as 'vanilla'
 * HttpServlet. Many non-Domino Java Servlets
 * implement HttpServlet.
 *
 * @author Eric McCormick, @edm00se
 *
 */
public class ExampleHttpServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
  public void init () {

    }

    @Override
  public void destroy () {

    }

    @Override
  protected void doGet (HttpServletRequest req, HttpServletResponse res) {
        HttpServletRequest _req = req;
        HttpServletResponse _res = res;
        PrintWriter out = null;
        try{
            _res.setContentType("text/plain");
            out = _res.getWriter();
            out.println("Servlet Running");
            out.println("You executed a "+_req.getMethod().toString()+" request.");
        }catch(Exception e){
            if(out!=null){
                out.println("Sorry, an error occurred...");
            }
        }finally{
            out.close();
        }
    }

}
```

Hopefully this seems familiar, even if it's a new format. As you can see, I've only exposed GET as an available method against this servlet. You can provide the others via the _do*_ methods or, you can specifically lock them down by providing a response code of _405_ (method not allowed) with any additional information, error or other descriptive message. It's worth note that the only _do*_ methods specifically available are _doGet_, _doPost_, _doPut_, and _doDelete_. To override this and provide, say, PATCH, as an available method, you would need to override the behavior offered by the default service method. This comes into play in the next approach, but we'll get there in a second.

An _HttpServlet_ is exactly what it claims, but probably isn't the best option for those who want to make use of much of the application, session, or anything which depends on FacesContext.

#### DesignerFacesServlet
So, in order to do anything derived off of FacesContext, we'll need a better implementation of our servlet. [Jesse Gallagher has blogged about this very topic](//frostillic.us/blog/posts/159496067A27FD3585257A70005E7BC1), big surprise there 😉. Some of the benefits include access to *Scope'd variables and any managed beans.

```java
package com.hello.servlets;

import java.io.IOException;
import java.io.PrintStream;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.xsp.webapp.DesignerFacesServlet;

/**
 * Example servlet showing the use of access to FacesContext.
 * This was originally blogged about by Jesse Gallagher and
 * is a near duplicate class.
 * src: https://frostillic.us/blog/posts/159496067A27FD3585257A70005E7BC1
 */
public class ExampleServlet extends DesignerFacesServlet {
  private static final long serialVersionUID = 1L;

  @SuppressWarnings("unchecked")
  @Override
  public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
    // Set up handy environment variables
    HttpServletRequest req = (HttpServletRequest)servletRequest;
    HttpServletResponse res = (HttpServletResponse)servletResponse;
    ServletOutputStream out = res.getOutputStream();
    FacesContext facesContext = this.getFacesContext(req, res);

    try {
      res.setContentType("text/plain");

      out.println("start");

      // The sessionScope is available via the ExternalContext. Resolving the variable
      //  would work as well
      Map<Object, Object> sessionScope = facesContext.getExternalContext().getSessionMap();
      // ... this is showing how we can get facesContext and *scope variables inside the servlet

      out.println("done");

    } catch(Exception e) {
      // hit an error, dump out whatever is there
      e.printStackTrace(new PrintStream(out));
    } finally {
      out.close();

      // It shouldn't be null if things are going well, but a check never hurt
      if(facesContext != null) {
        //complete the response and release the handle on the FacesContext instance
        facesContext.responseComplete();
        facesContext.release();
      }
    }
  }

  /**
   * @return FacesContext currentInstance
   */
  public static FacesContext getFacesContext() {
    return FacesContext.getCurrentInstance();
  }
}
```

You can take note that we're being sure not just to close the output stream, but also the mark the _FacesContext_ handle as _responseComplete_ and releasing it back into the wild; **do not forget to do this**; this is implied for each and every response operation you provide.

The largest thing to note is, as mentioned above, we're overriding the _service_ method. This means that, by default, our accessing of the end point _happens_ to be a GET. We need to provide for the response handling based on the request method. It would go something like this:

```java
String reqMethod = req.getMethod();

if( reqMethod.equals("GET") ) {
  try {
    out.println("doing something with my GET");
    } catch (Exception e) {
      e.printStackTrace();
      out.println(e.toString());
    } finally {
      facesContext.responseComplete();
      facesContext.release();
      out.close();
    }
} else if( reqMethod.equals("POST") ) {
  try {
    out.println("doing something with my POST");
    } catch (Exception e) {
      e.printStackTrace();
      out.println(e.toString());
    } finally {
      facesContext.responseComplete();
      facesContext.release();
      out.close();
    }
}
```

The tedium of always adding a _try_/_catch_ block with _finally_ blocks to _close_ the output and mark the _FacesContext_ as _responseComplete_ and performing the _release_ is exactly the sort of thing that we as developers like to automate, by abstracting.

#### AbstractXSPServlet
This is the third flavor; it extends and, ultimately, is a `DesignerFacesServlet`, but by using an abstracted Servlet class, we can automate each of _out.close()_, _facesContext.responseComplete()_, and _facesContext.release()_, with each response, with minimal hassle. Jesse came up with this and I've pulled a copy for my use [directly from his frostillic.us framework](//github.com/jesse-gallagher/XPages-Scaffolding/blob/master/frostillicus.framework.plugin/src/frostillicus/xsp/servlet/AbstractXSPServlet.java) for use in my own code base. I recommend you have a read and grab a copy. Essentially, as Jesse shows in his [part 7 of his building an app with the frostillic.us framework](//frostillic.us/blog/posts/D815DC7ED059395885257D6B00001006), all that's needed is to build a class to extend _AbstractXSPServlet_ and override the _doService_ method, which is wrapper with the necessary _out.close()_, _facesContext.responseComplete()_, and _facesContext.release()_, for each response. This means our servlet class only has to contain what we need it to. Also note that I'm starting to define my response code for each of the non-GET methods.

```java
package com.hello.servlets;

import java.util.Enumeration;

import javax.faces.context.FacesContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.commons.util.StringUtil;

import frostillicus.xsp.servlet.AbstractXSPServlet;

/**
 * Example Servlet implementing AbstractXSPServlet,
 * from Jesse Gallagher.
 *
 * @author Eric McCormick, @edm00se
 *
 */
public class ExampleAbstractedServlet extends AbstractXSPServlet {

  /* (non-Javadoc)
   * @see frostillicus.xsp.servlet.AbstractXSPServlet#doService(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, javax.faces.context.FacesContext, javax.servlet.ServletOutputStream)
   */
  @Override
  protected void doService(HttpServletRequest req, HttpServletResponse res,
      FacesContext facesContext, ServletOutputStream out)
      throws Exception {

        res.setContentType("text/plain");

          String reqMethod = req.getMethod();

          if( reqMethod.equals("GET") ) {

          out.println("doing something with GET");

          } else if( reqMethod.equals("POST") ) {
            res.setStatus(200); // OK
            out.println("doing something with POST");

          } else if( reqMethod.equals("PUT") ) {
            res.setStatus(200); // OK
            out.println("doing something with PUT");

          } else if( reqMethod.equals("DELETE") ) {
            res.setStatus(200); // OK
            out.println("doing something with DELETE");

          } else if( reqMethod.equals("PATCH") ) {
            res.setStatus(200); // OK
            out.println("doing something with PATCH");

          } else {
            res.setStatus(405); // method not allowed
            out.println("what the devil are you trying to do, break the server?");
          }
  }

}
```

##### Summary
The big take away here is a common base of reference. Going forward, I'll be implementing Jesse's AbstractXSPServlet, which looks and acts differently than just a DesignerFacesServlet or HttpServlet. I recommend you examine what best fits your needs, but I think you should be happy with what it provides.

In the next post, I'll be showing how to implement a servlet via a _ServletFactory_ (so we can actually access it) and start framing out some method handling. As always, if anyone has a better way or alternative method, there's the comments section and I welcome response blog posts.
