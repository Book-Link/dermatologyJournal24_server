const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
var bodyParser = require("body-parser");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u7cx5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydortly.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const termsConditionCollection = client
    .db("dermatologyjournal")
    .collection("termsAndCondition");

  const frontPageTopImgCollection = client
    .db("dermatologyjournal")
    .collection("topImg");

  const frontPageMiddleImgCollection = client
    .db("dermatologyjournal")
    .collection("middleImg");

  const frontPageDisclaimerCollection = client
    .db("dermatologyjournal")
    .collection("disclaimer");

  const displayBookBannerImg = client
    .db("dermatologyjournal")
    .collection("displayBookImage");

  const authenticationCollection = client
    .db("dermatologyjournal")
    .collection("authData");

  const bookCollection = client.db("dermatologyjournal").collection("books");

  // INSERT terms and condition data AT THE DATABASE
  app.post("/addTermsCondition", (req, res) => {
    termsConditionCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the terms and Condition data from  collection
  app.get("/getTermsCondition", (req, res) => {
    termsConditionCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //delete the terms and condition data from database
  app.delete("/termsConditiondelete/:id", async (req, res) => {
    try {
      const termsConditionId = req.params.id;
      const result = await termsConditionCollection.deleteOne({
        _id: ObjectId(termsConditionId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Top Image  AT THE DATABASE home page
  app.post("/addFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page Top Image from  collection home page
  app.get("/getFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page Top Image from  collection home page
  app.delete("/topImgdelete/:id", async (req, res) => {
    try {
      const FrontTopImgId = req.params.id;
      const result = await frontPageTopImgCollection.deleteOne({
        _id: ObjectId(FrontTopImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT middle Image AT THE DATABASE home page
  app.post("/addFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page middle Image from  collection home page
  app.get("/getFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page middle Image from  collection home page
  app.delete("/middleImgdelete/:id", async (req, res) => {
    try {
      const FrontMidImgId = req.params.id;
      const result = await frontPageMiddleImgCollection.deleteOne({
        _id: ObjectId(FrontMidImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT disclaimer data AT THE DATABASE home page
  app.post("/addFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page disclaimer from  collection home page
  app.get("/getFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page disclaimer from  collection home page
  app.delete("/disclaimerDelete/:id", async (req, res) => {
    try {
      const FrontDisclaimerId = req.params.id;
      const result = await frontPageDisclaimerCollection.deleteOne({
        _id: ObjectId(FrontDisclaimerId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //Insert display book top banner Image books display page
  app.post("/addDisplayBookTopImage", (req, res) => {
    displayBookBannerImg.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  //get the display books top banner
  app.get("/DisplayBookTopImage", (req, res) => {
    displayBookBannerImg.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //delete the display book banner
  app.delete("/bookDisplayImgdelete/:id", async (req, res) => {
    try {
      const displayBooksBannerImgId = req.params.id;
      const result = await displayBookBannerImg.deleteOne({
        _id: ObjectId(displayBooksBannerImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Books DATA AT THE DATABASE
  app.post("/addBookData", (req, res) => {
    bookCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the Books DATA from  collection for admin active books
  app.get("/getBookData", (req, res) => {
    bookCollection.find({ status: "active" }).toArray((err, documents) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving active books");
      } else {
        res.send(documents.reverse());
      }
    });
  });

  //get the Books DATA from  collection for client pending books
  app.get("/getPendingBookData", (req, res) => {
    bookCollection.find({ status: "pending" }).toArray((err, documents) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving pending books");
      } else {
        res.send(documents.reverse());
      }
    });
  });

  //update the book status for pending to active
  app.patch("/updateBookStatus/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            status: req.body.status,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete the pending books
  app.delete("/deletePendingBook/:id", (req, res) => {
    const bookId = req.params.id;

    bookCollection
      .deleteOne({ _id: ObjectId(bookId) })
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: "Delete failed" });
      });
  });

  //get the single book for editing from collection
  app.get("/singleBook/:id", (req, res) => {
    bookCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  //update book image
  app.patch("/updateBookImage/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookImg: req.body.bookImg,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book name
  app.patch("/updateBookName/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookName: req.body.bookName,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update author name
  app.patch("/updateBookAuthorName/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            authorName: req.body.authorName,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update isbn/source name
  app.patch("/updateBookIsbn/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            isbn: req.body.isbn,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update number/ DOI NUMBER
  app.patch("/updateBookNumber/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookNumber: req.body.bookNumber,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book link
  app.patch("/updateBookLink/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookLink: req.body.bookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book download link
  app.patch("/updateBookDownloadLink/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            downloadBookLink: req.body.downloadBookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update books data edit
  app.patch("/updateBook/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookImg: req.body.bookImg,
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            isbn: req.body.isbn,
            bookNumber: req.body.bookNumber,
            bookLink: req.body.bookLink,
            downloadBookLink: req.body.downloadBookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete the books data from colletion
  app.delete("/bookDelete/:id", async (req, res) => {
    try {
      const booksId = req.params.id;
      const result = await bookCollection.deleteOne({
        _id: ObjectId(booksId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //singup data added
  app.post("/addSignupData", (req, res) => {
    const { email, phoneNumber } = req.body;
    authenticationCollection
      .findOne({ email })
      .then((existingUserWithEmail) => {
        if (existingUserWithEmail) {
          return res.status(400).send({ error: "Email already in use" });
        } else {
          authenticationCollection
            .findOne({ phoneNumber })
            .then((existingUserWithPhone) => {
              if (existingUserWithPhone) {
                return res
                  .status(400)
                  .send({ error: "Phone number already in use" });
              } else {
                authenticationCollection.insertOne(req.body).then((result) => {
                  res.send(result);
                });
              }
            });
        }
      });
  });

  //get login data
  app.get("/getAuthData", async (req, res) => {
    authenticationCollection
      .find({
        phoneNumber: req.query?.phoneNumber,
        password: req.query?.password,
        active: true,
      })
      .toArray((err, documents) => {
        if (err) {
          console.error(err);
          res.status(500).send({
            message:
              "An error occurred while retrieving the authentication data.",
          });
        } else {
          res.send(documents);
        }
      });
  });

  app.patch("/editPass/:email", async (req, res) => {
    const email = req.params.email;
    const password = req.body.password;

    await authenticationCollection
      .updateOne({ email: email }, { $set: { password: password } })
      .then((result) => {
        res.status(200).send({ message: "Password updated successfully" });
      })
      .catch((error) => {
        res.status(500).send({ message: "Error updating password" });
        console.log(error);
      });
  });

  //// get all the users
  app.get("/getAllUser", async (req, res) => {
    try {
      const data = await authenticationCollection.find({}).toArray();
      if (data.length > 0) {
        res.send(data);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //mathing gmail for the fortopassword gmail send to inbox and go to the link
  app.get("/getMatchedEmailData", (req, res) => {
    const receivedEmail = req.query.email;
    authenticationCollection
      .find({
        email: receivedEmail,
      })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  //user delete
  app.delete("/userDelete/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await authenticationCollection.deleteOne({
        _id: ObjectId(userId),
      });
      if (result) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //user update for start and stop account from admin
  app.patch("/userUpdate/:id", async (req, res) => {
    try {
      const filter = { _id: new ObjectId(req.params.id) };
      const update = { $set: req.body };
      const result = await authenticationCollection.updateOne(filter, update);
      if (result.modifiedCount > 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  //   end the collection
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port);
app.listen(port, () => console.log(`connected database server${port}`));
