
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.IO;
using System.Web.Routing;
namespace Help.Controllers
{
    [HandleError]
    public abstract class GlobalBaseController : Controller
    {
        /// <summary>
        /// Construction of controller. 
        /// Set content path for the script/style sheet files to download
        /// </summary>
        public GlobalBaseController()
        {
            ViewBag.ContentPath = ConfigurationManager.AppSettings["ContentPath"];
            ViewBag.MenuClass = "";
        }
        
        #region Global basic way of Exception handling

        protected static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected virtual string username { get { return string.Empty; } }
        protected virtual int user_Id { get { return 0; } }
        protected virtual int Organization_Id { get { return 0; } }
        protected virtual int profile_Id { get { return 0; } }
        protected virtual bool SandWitchMode { get { return false; } }
        /// <summary>
        /// Check for the errro other than controllers
        /// </summary>
        /// <param name="filterContext"></param>
        /// <returns></returns>
        private bool IsAjax(ExceptionContext filterContext)
        {
            return filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }
        /// <summary>
        /// Check for the errro other than controllers
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            // Write error logging code here if you wish.
            try
            {
                //if want to get different of the request
                var currentController = (string)filterContext.RouteData.Values["controller"];
                var currentActionName = (string)filterContext.RouteData.Values["action"];

                string errorAt = "\n\n User : " + (string.IsNullOrEmpty(username) ? "Anonymous" : username) + " , Error at : " + currentController + "--> " + currentActionName + "();";
                //Utilities.LogErrorsToDB(filterContext.Exception.GetType().Name, username, user_Id, filterContext.Exception.Message, filterContext.Exception.StackTrace, 1,GetClientIpAddress( HttpContext.Request));
                

            }
            catch(Exception ex) {
                log.Error("ErrorOccured At:", ex);
            }
            if (filterContext.ExceptionHandled || !filterContext.HttpContext.IsCustomErrorEnabled)
            {
                return;
            }

            // if the request is AJAX return JSON else view.
            if (IsAjax(filterContext))
            {
                //Because its a exception raised after ajax invocation
                //Lets return Json
                filterContext.Result = new JsonResult()
                {
                    Data = filterContext.Exception.Message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };

                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
            }
            else
            {
                //Normal Exception
                //So let it handle by its default ways.
                base.OnException(filterContext);
                this.View("Error").ExecuteResult(this.ControllerContext);
            }


        }
       
        public static string GetClientIpAddress(HttpRequestBase request)
        {
            try
            {
                var userHostAddress = request.UserHostAddress;

                // Attempt to parse.  If it fails, we catch below and return "0.0.0.0"
                // Could use TryParse instead, but I wanted to catch all exceptions
                IPAddress.Parse(userHostAddress);

                var xForwardedFor = request.ServerVariables["X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(xForwardedFor))
                    return userHostAddress;

                // Get a list of public ip addresses in the X_FORWARDED_FOR variable
                var publicForwardingIps = xForwardedFor.Split(',').Where(ip => !IsPrivateIpAddress(ip)).ToList();

                // If we found any, return the last one, otherwise return the user host address
                return publicForwardingIps.Any() ? publicForwardingIps.Last() : userHostAddress;
            }
            catch (Exception)
            {
                // Always return all zeroes for any failure (my calling code expects it)
                return "0.0.0.0";
            }
        }

        private static bool IsPrivateIpAddress(string ipAddress)
        {
            // http://en.wikipedia.org/wiki/Private_network
            // Private IP Addresses are: 
            //  24-bit block: 10.0.0.0 through 10.255.255.255
            //  20-bit block: 172.16.0.0 through 172.31.255.255
            //  16-bit block: 192.168.0.0 through 192.168.255.255
            //  Link-local addresses: 169.254.0.0 through 169.254.255.255 (http://en.wikipedia.org/wiki/Link-local_address)

            var ip = IPAddress.Parse(ipAddress);
            var octets = ip.GetAddressBytes();

            var is24BitBlock = octets[0] == 10;
            if (is24BitBlock) return true; // Return to prevent further processing

            var is20BitBlock = octets[0] == 172 && octets[1] >= 16 && octets[1] <= 31;
            if (is20BitBlock) return true; // Return to prevent further processing

            var is16BitBlock = octets[0] == 192 && octets[1] == 168;
            if (is16BitBlock) return true; // Return to prevent further processing

            var isLinkLocalAddress = octets[0] == 169 && octets[1] == 254;
            return isLinkLocalAddress;
        }
        #endregion
    }
}
