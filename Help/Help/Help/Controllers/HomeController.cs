
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Newtonsoft.Json;
using System.Web.Routing;
using Newtonsoft.Json.Linq;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System.Security.Claims;
//using OwinAuthentication;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataProtection;
using Owin;
using System.Net.Http;
using Kendo.Mvc.UI;
using System.ComponentModel;
using Help;

namespace Help.Controllers
{
    public class HomeController : GlobalBaseController
    {

        public ActionResult Home()
        {
            return View();
        }
    }
}
