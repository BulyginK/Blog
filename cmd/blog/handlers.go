package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	Title         string
	Subtitle      string
	FeaturedPosts []featuredPostData
	MostRecent    []mostRecentData
	// PostDate      time.Time `db:"date_new"`
}

// type postPage struct {
// 	Title    string
// 	Subtitle string
// 	ImgPost  string
// 	PostText string
// }

type featuredPostData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"img_post_style"`
	Label    string `db:"label"`
	Author   string `db:"author"`
	Avatar   string `db:"author_ur"`
	PostDate string `db:"publish_date"`
}

type mostRecentData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"image_url"`
	Author   string `db:"author"`
	Avatar   string `db:"author_ur"`
	PostDate string `db:"publish_date"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postsFeatured, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		postsMostRecent, err := mostRecentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		// postDate, err := postDateNew(db)
		// if err != nil {
		// 	http.Error(w, "Internal Server Error", 500)
		// 	log.Println(err)
		// 	return
		// }

		data := indexPageData{
			Title:         "Blog for traveling",
			Subtitle:      "My best blog for adventures and burgers",
			FeaturedPosts: postsFeatured,
			MostRecent:    postsMostRecent,
			// PostDate:      postDate,
		}

		err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			img_post_style,
			label,
			author,
			author_ur,
			publish_date
		FROM
			post
		WHERE featured = 1
	`

	var posts []featuredPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func mostRecentPosts(db *sqlx.DB) ([]mostRecentData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			author,
			author_ur,
			publish_date
		FROM
			post
		WHERE featured = 0
	`

	var posts []mostRecentData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

// func postDateNew(db *sqlx.DB) (time.Time, error) {

// 	const query = `
// 	SELECT
// 	  date_new
// 	FROM
// 	  post
// 	WHERE featured = 1
// 	`

// 	var post_date time.Time

// 	err := db.Select(&post_date, query)
// 	if err != nil {
// 		return post_date, err
// 	}

// 	return post_date, nil
// }
