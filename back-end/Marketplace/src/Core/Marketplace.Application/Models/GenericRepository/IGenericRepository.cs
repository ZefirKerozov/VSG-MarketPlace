using System.Collections.Generic;

namespace Marketplace.Application.Models.GenericRepository
{
    public interface IGenericRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<int> Create(T entity);
        Task Update(T entity);
         Task Delete(int id);
    }
}