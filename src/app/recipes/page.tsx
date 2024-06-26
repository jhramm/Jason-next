"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Recipes() {

  type recipeType = {
    id: number;
    image: string;
    cuisine: string;
    ingredients: string[];
    instructions: string[];

  }


  const [recipes, setRecipes] = useState<recipeType[]>([]);

  const getData = () => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        console.log(response.data.recipes);
        setRecipes(response.data.recipes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-between gap-2 flex-wrap align-middle p-5 bg-slate-400">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="pl-4 pr-4 bg-slate-600 text-white text-center w-[400px] pb-5"
        >
          <Image
            src={recipe.image}
            alt="recipes"
            width={300}
            height={200}
            className="m-[auto] mb-3 pt-2"
          />
          <h1 className="mb-2">{recipe.cuisine}</h1>
          <h2 className="mb-2 text-[30px]">Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="mb-2 mt-2 text-[30px]">Instructions:</h2>
          <ul>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
