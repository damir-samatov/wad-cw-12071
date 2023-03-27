using wad_cw_12071_backend.Services;

namespace wad_cw_12071_backend.Middlewares
{
    public class ManagerAuthMiddleware : IMiddleware
    {

        private readonly AuthService _authService;

        public ManagerAuthMiddleware( AuthService authService )
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

            var manager = _authService.AuthorizeManager(sessionId);

            if ( manager == null )
            {
                OnUnauthorized(context);
                return;
            }

            context.Items.Add("ManagerId", manager.Id);

            await next(context);
        }

        public static async Task OnUnauthorized( HttpContext context )
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Forbidden");
        }
    }
}
