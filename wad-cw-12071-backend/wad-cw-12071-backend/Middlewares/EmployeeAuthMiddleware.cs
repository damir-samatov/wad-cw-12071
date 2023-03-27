using Azure.Core;
using wad_cw_12071_backend.Services;

namespace wad_cw_12071_backend.Middlewares
{
    public class EmployeeAuthMiddleware : IMiddleware
    {

        private readonly AuthService _authService;

        public EmployeeAuthMiddleware( AuthService authService )
        {
            _authService = authService;
        }

        public async Task InvokeAsync( HttpContext context, RequestDelegate next )
        {
            var sessionId = context.Request.Headers[ "X-Auth-Token" ].ToString();

            if ( sessionId == null )
            {
                OnUnauthorized(context);
                return;
            }

            var employee = _authService.AuthorizeEmployee(sessionId);

            if ( employee == null )
            {
                OnUnauthorized(context);
                return;
            }

            context.Items.Add("EmployeeId", employee.Id);

            await next(context);
        }

        private static async Task OnUnauthorized( HttpContext context )
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;

            await context.Response.WriteAsync("Forbidden");
        }
    }
}
