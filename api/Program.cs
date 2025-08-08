var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/api/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// Simple status endpoint used by the client to reflect current build-in-public state
app.MapGet("/api/status", () => new
{
    status = "in_development",
    message = "In development – building in public as a learning + opportunity platform.",
    updatedAtUtc = DateTime.UtcNow
});

// About/Mission endpoint that the client can render
app.MapGet("/api/about", () => new
{
    name = "SnapOut",
    mission = "At SnapOut, our mission is to help professionals break free from the perpetual cycle of work‑consume‑repeat so they can build diversified income, align their careers with passion, and gain the time and agency to live life on their own terms.",
    about = "SnapOut is an early-stage project designed to help people escape the rat race through a combination of mindset, systems, and digital tools. Whether you're exploring financial independence, launching a side hustle, or just want to regain control of your time, SnapOut is here to support that journey.",
    notes = "This is a public repo built by a passionate developer currently focused on landing a new software engineering job. But if that doesn’t work out, this project may evolve into a full startup.",
    contact = new { author = "Jamaal", tagline = "Software Developer & Freedom Seeker." }
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
