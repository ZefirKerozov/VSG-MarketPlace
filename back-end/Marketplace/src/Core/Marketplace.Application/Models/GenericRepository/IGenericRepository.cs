using System.Collections.Generic;

namespace Marketplace.Application.Models.GenericRepository
{
    public interface IGenericRepository<T>
    {
        List<T> GetAll();
        T GetById(int id);
        int Create(T entity);
        void Update(T entity);
        public void Delete(int id);
    }
}