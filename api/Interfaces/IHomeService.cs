namespace api.Services.Interfaces;

public interface IHomeService
{
    Task<object> GetApiStatusAsync();
    Task<object> GetHealthAsync();
    Task<object> GetApiInfoAsync();
}