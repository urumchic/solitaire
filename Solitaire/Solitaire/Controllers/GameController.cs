using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataLayer.Models;
using MongoRepository;

namespace Solitaire.Controllers
{
    public class GameController : Controller
    {
        //
        // GET: /Game/

        public ActionResult Index(string id)
        {
            MongoRepository<Game> gameRepository = new MongoRepository<Game>();

            Game game = gameRepository.FirstOrDefault(gameItem => gameItem.Id == "000000000000000000000000");

            return View(game);
        }

    }
}
