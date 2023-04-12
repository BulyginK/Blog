package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	FeaturedPosts []featuredPostData
	MostRecent    []mostRecentData
}

type post struct {
	PagePost []postPageData
}

type featuredPostData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"image_url"`
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

type postPageData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"bigimage_url"`
	PostText string `db:"post_text"`
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

		data := indexPageData{
			FeaturedPosts: postsFeatured,
			MostRecent:    postsMostRecent,
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
			image_url,
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

func pagePost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postPageData, err := postPage(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := post{
			PagePost: postPageData,
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

func postPage(db *sqlx.DB) ([]postPageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			bigimage_url,
			post_text
		FROM
			post
	`

	var post []postPageData

	err := db.Select(&post, query)
	if err != nil {
		return nil, err
	}

	return post, nil
}
