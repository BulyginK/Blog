package main

import (
	"html/template"
	"log"
	"net/http"
)

type indexPage struct {
	Title         string
	Menu          []menuData
	NavBlock      []navBlockData
	FeaturedPosts []featuredPostData
	MostRecent    []mostRecentData
}

type postPage struct {
	Title string
	Menu  []menuData
}

type menuData struct {
	MenuItem     string
	HrefMenuItem string
}

type navBlockData struct {
	NavBlockItem string
	HrefItem     string
}

type featuredPostData struct {
	PostHidden  string
	Title       string
	Subtitle    string
	ImgPost     string
	AdventLabel string
	LabelHidden string
	Author      string
	Avatar      string
	PostDate    string
}

type mostRecentData struct {
	PostHidden string
	Title      string
	Subtitle   string
	ImgPost    string
	Author     string
	Avatar     string
	PostDate   string
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
		Menu:          menuNavItems(),
		NavBlock:      navBlockItems(),
		FeaturedPosts: featuredPosts(),
		MostRecent:    mostRecent(),
	}

	err = ts.Execute(w, data) // Запускаем шаблонизатор для вывода шаблона в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func post(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/post.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())
		return
	}

	data := postPage{
		Title: "The road ahead",
		Menu:  menuNavItems(),
	}

	err = ts.Execute(w, data) // Запускаем шаблонизатор для вывода шаблона в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func menuNavItems() []menuData {
	return []menuData{
		{
			MenuItem:     "Home",
			HrefMenuItem: "#",
		},
		{
			MenuItem:     "Categories",
			HrefMenuItem: "#",
		},
		{
			MenuItem:     "About",
			HrefMenuItem: "#",
		},
		{
			MenuItem:     "Contact",
			HrefMenuItem: "#",
		},
	}
}

func navBlockItems() []navBlockData {
	return []navBlockData{
		{
			NavBlockItem: "Nature",
			HrefItem:     "#",
		},
		{
			NavBlockItem: "Photography",
			HrefItem:     "#",
		},
		{
			NavBlockItem: "Relaxation",
			HrefItem:     "#",
		},
		{
			NavBlockItem: "Vacation",
			HrefItem:     "#",
		},
		{
			NavBlockItem: "Travel",
			HrefItem:     "#",
		},
		{
			NavBlockItem: "Adventure",
			HrefItem:     "#",
		},
	}
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgPost:     "cards__big-card_background_the-road-ahead",
			AdventLabel: "Adventure",
			LabelHidden: "hidden",
			Author:      "Mat Vogels",
			Avatar:      "./static/avatars/Mat_Vogels.jpg",
			PostDate:    "September 25, 2015",
		},
		{
			Title:       "From Top Down",
			Subtitle:    "Once a year, go someplace you’ve never been before.",
			ImgPost:     "cards__big-card_background_from-top-down",
			AdventLabel: "Adventure",
			LabelHidden: "visible",
			Author:      "William Wong",
			Avatar:      "./static/avatars/William_Wong.jpg",
			PostDate:    "September 25, 2015",
		},
	}
}

func mostRecent() []mostRecentData {
	return []mostRecentData{
		{
			PostHidden: "",
			ImgPost:    "./static/img/Still_Standing_Tall.jpg",
			Title:      "Still Standing Tall",
			Subtitle:   "Life begins at the end of your comfort zone.",
			Author:     "William Wong",
			Avatar:     "./static/avatars/William_Wong.jpg",
			PostDate:   "9/25/2015",
		},
		{
			PostHidden: "",
			ImgPost:    "./static/img/Sunny_Side_Up.jpg",
			Title:      "Sunny Side Up",
			Subtitle:   "No place is ever as bad as they tell you it’s going to be.",
			Author:     "Mat Vogels",
			Avatar:     "./static/avatars/Mat_Vogels.jpg",
			PostDate:   "9/25/2015",
		},
		{
			PostHidden: "",
			ImgPost:    "./static/img/Water_Falls.jpg",
			Title:      "Water Falls",
			Subtitle:   "We travel not to escape life, but for life not to escape us.",
			Author:     "Mat Vogels",
			Avatar:     "./static/avatars/Mat_Vogels.jpg",
			PostDate:   "9/25/2015",
		},
		{
			PostHidden: "",
			ImgPost:    "./static/img/Through_the_Mist.jpg",
			Title:      "Through the Mist",
			Subtitle:   "Travel makes you see what a tiny place you occupy in the world.",
			Author:     "William Wong",
			Avatar:     "./static/avatars/William_Wong.jpg",
			PostDate:   "9/25/2015",
		},
		{
			PostHidden: "",
			ImgPost:    "./static/img/Awaken_Early.jpg",
			Title:      "Awaken Early",
			Subtitle:   "Not all those who wander are lost.",
			Author:     "Mat Vogels",
			Avatar:     "./static/avatars/Mat_Vogels.jpg",
			PostDate:   "9/25/2015",
		},
		{
			PostHidden: "",
			ImgPost:    "./static/img/Try_it_Always.jpg",
			Title:      "Try it Always",
			Subtitle:   "The world is a book, and those who do not travel read only one page.",
			Author:     "Mat Vogels",
			Avatar:     "./static/avatars/Mat_Vogels.jpg",
			PostDate:   "9/25/2015",
		},
	}
}
