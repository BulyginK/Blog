package main

import (
	"html/template"
	"log"
	"net/http"
)

type indexPage struct {
	Title         string
	FeaturedPosts []featuredPostData
}

type featuredPostData struct {
	Title    string
	Subtitle string
	// ImgPost  string
	Label    string
	Author   string
	Avatar   string
	PostDate string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())
		return
	}

	data := indexPage{
		Title:         "Escape",
		FeaturedPosts: featuredPosts(),
	}

	err = ts.Execute(w, data) // Запускаем шаблонизатор для вывода шаблона в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:    "The Road Ahead",
			Subtitle: "The road ahead might be paved - it might not be.",
			// ImgPost:  "url(/img/the-road-ahead.jpg)",
			Label:    "Adventure",
			Author:   "Mat Vogels",
			Avatar:   "src='./avatars/Mat_Vogels.jpg'",
			PostDate: "September 25, 2015",
		},
		{
			Title:    "From Top Down",
			Subtitle: "Once a year, go someplace you’ve never been before.",
			// ImgPost:  "url(/img/the-road-ahead.jpg)",
			Label:    "Adventure",
			Author:   "William Wong",
			Avatar:   "src='./avatars/William_Wong.jpg'",
			PostDate: "September 25, 2015",
		},
	}
}
