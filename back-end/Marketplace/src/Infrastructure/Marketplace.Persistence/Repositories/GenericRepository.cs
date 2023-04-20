﻿using System.Data;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;

namespace Marketplace.Persistence.Repositories
{
    public  class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly IUnitOfWork _unitOfWork;
        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IDbConnection Connection => _unitOfWork.Connection;

        public IDbTransaction Transaction => _unitOfWork.Transaction;
        public List<T> GetAll()
        {
            return Connection.GetList<T>(null,null, Transaction).ToList();
        }
        public T GetById(int id)
        {
            return Connection.Get<T>(id,Transaction);
        }
        public int Create(T entity)
        {
            return (int)Connection.Insert<T>(entity, Transaction);
        }
        public void Update(T entity)
        {
            Connection.Update<T>(entity, Transaction);
        }
        public void Delete(int id)
        {
            Connection.Delete<T>(id, Transaction);
        }
    }
}