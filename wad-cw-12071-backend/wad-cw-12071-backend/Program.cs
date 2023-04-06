using Microsoft.EntityFrameworkCore;
using wad_cw_12071_backend.Data;
using wad_cw_12071_backend.Middlewares;
using wad_cw_12071_backend.Repository;
using wad_cw_12071_backend.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseString")));

builder.Services.AddDistributedMemoryCache();

builder.Services.AddControllers();

builder.Services.AddScoped<EmployeeAuthMiddleware>();

builder.Services.AddScoped<ManagerAuthMiddleware>();

builder.Services.AddTransient<AuthService, AuthService>();

builder.Services.AddTransient<AuthRepository, AuthRepository>();

builder.Services.AddTransient<EmployeeRepository, EmployeeRepository>();

builder.Services.AddTransient<ManagerRepository, ManagerRepository>();

builder.Services.AddTransient<TicketRepository, TicketRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});

WebApplication app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyHeader();
    options.AllowAnyMethod();
});

app.UseAuthorization();

app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/employee"),
    middleware => middleware.UseMiddleware<EmployeeAuthMiddleware>());

app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/manager"),
    middleware => middleware.UseMiddleware<ManagerAuthMiddleware>());

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
