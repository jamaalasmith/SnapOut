using api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add application services using extension method
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure application pipeline using extension method
app.ConfigureApplication();

app.Run();