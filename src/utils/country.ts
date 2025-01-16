import { getCollection } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

export const getCategories = async () => {
	const tours = await getCollection('tours')
	const categories = new Set(
		tours.filter((tour) => !tour.data.draft).map((tour) => tour.data.category)
	)
	return Array.from(categories).sort((a, b) =>
		CATEGORIES.indexOf(a) < CATEGORIES.indexOf(b) ? -1 : 1
	)
}

export const getTours = async (max?: number) => {
	return (await getCollection('tours'))
		.filter((tour) => !tour.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

export const getCitiesByCountry = async (country: string) => {
	const tours = await getTours()
	const lowercaseCountry = country.toLowerCase()
	return tours
		.filter((tour) => !tour.data.draft)
		.filter((tour) => {
			return tour.data.country.toLowerCase() === lowercaseCountry
		})
		.map((tour) => tour.data.city)
}

export const getCountries = async () => {
	const tours = await getCollection('tours')
	const countries = new Set()
	tours
		.filter((tour) => !tour.data.draft)
		.forEach((tour) => {
			const country = tour.data.country
			if (country != '') {
				countries.add(country.toLowerCase())
			}
		})

	return Array.from(countries)
}

export const getTourByCountry = async (country: string) => {
	const tours = await getTours()
	const lowercaseCountry = country.toLowerCase()
	return tours
		.filter((tour) => !tour.data.draft)
		.filter((tour) => {
			return tour.data.country.toLowerCase() === lowercaseCountry
		})
}

export const filterToursByCategory = async (category: string) => {
	const tours = await getTours()
	return tours
		.filter((tour) => !tour.data.draft)
		.filter((tour) => tour.data.category.toLowerCase() === category)
}
