package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	FeaturedPosts []*featuredPostData
	MostRecent    []*mostRecentData
}

type postData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"bigimage_url"`
	PostText string `db:"post_text"`
}

type featuredPostData struct {
	PostId   string `db:"post_id"`
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"image_url"`
	Label    string `db:"label"`
	Author   string `db:"author"`
	Avatar   string `db:"author_ur"`
	PostDate string `db:"publish_date"`
	PostURL  string
}

type mostRecentData struct {
	PostId   string `db:"post_id"`
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	ImgPost  string `db:"image_url"`
	Author   string `db:"author"`
	Avatar   string `db:"author_ur"`
	PostDate string `db:"publish_date"`
	PostURL  string
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

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"] // Получаем orderID в виде строки из параметров урла

		postID, err := strconv.Atoi(postIDStr) // Конвертируем строку orderID в число
		if err != nil {
			http.Error(w, "Invalid post id", 403)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				// sql.ErrNoRows возвращается, когда в запросе к базе не было ничего найдено
				// В таком случае мы возвращем 404 (not found) и пишем в тело, что ордер не найден
				http.Error(w, "Post not found", 404)
				log.Println(err)
				return
			}

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

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func featuredPosts(db *sqlx.DB) ([]*featuredPostData, error) {
	const query = `
		SELECT
		  post_id,
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

	var posts []*featuredPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	for _, post := range posts {
		post.PostURL = "/post/" + post.PostId // Формируем исходя из ID поста в базе
	}

	fmt.Println(posts)

	return posts, nil
}

func mostRecentPosts(db *sqlx.DB) ([]*mostRecentData, error) {
	const query = `
		SELECT
		  post_id,
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

	var posts []*mostRecentData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	for _, post := range posts {
		post.PostURL = "/post/" + post.PostId // Формируем исходя из ID поста в базе
	}

	fmt.Println(posts)

	return posts, nil
}

// Получает информацию о конкретном посте из базы данных
func postByID(db *sqlx.DB, postID int) (postData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			bigimage_url,
			post_text
		FROM
			` + "`post`" +
		`WHERE
			post_id = ?
	`
	// В SQL-запросе добавились параметры, как в шаблоне. ? означает параметр, который мы передаем в запрос ниже

	var post postData

	// Обязательно нужно передать в параметрах orderID
	err := db.Get(&post, query, postID)
	if err != nil {
		return postData{}, err
	}

	return post, nil
}
