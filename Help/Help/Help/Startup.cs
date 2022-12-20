using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataProtection;


[assembly: OwinStartupAttribute(typeof(Help.Startup))]
namespace Help
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions
            {
                AccessTokenFormat = new TicketDataFormat(app.CreateDataProtector(
                      typeof(OAuthAuthorizationServerMiddleware).Namespace,
                      "Access_Token", "v1"))
            };
        }
    }
}
