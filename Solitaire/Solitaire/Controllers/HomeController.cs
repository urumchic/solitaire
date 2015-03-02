using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataLayer.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoRepository;

namespace Solitaire.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            MongoRepository<Game> gameRepository = new MongoRepository<Game>();

            var game = new Game()
            {
                CreateDate = DateTime.Now,
                States = new List<int[][]>() {new int[][] {new[] {-1, -1, 0, 0, 0, -1, -1}, 
                                                           new[] {-1, -1, 0, 0, 0, -1, -1},
                                                           new[] { 0,  0, 1, 1, 1,  0,  0},
                                                           new[] { 0,  0, 1, 1, 1,  0,  0},
                                                           new[] { 0,  0, 1, 1, 1,  0,  0},
                                                           new[] {-1, -1, 0, 0, 0, -1, -1},
                                                           new[] {-1, -1, 0, 0, 0, -1, -1},
                                                           new[] {-1, -1, 0, 0, 0, -1, -1}
                                                           }},
                UserId = "Roman",
                Id = "000000000000000000000000"
            };
            gameRepository.Add(game);


            return View();
        }

    }
}
