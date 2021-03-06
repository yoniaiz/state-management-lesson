import { useEffect } from "react";
import axios from "axios";
import { useCharacterContext } from "../context/CharactersContext";

export const useFetchCharacterByIdContext = (id) => {
  const { characters, status, updateCharacter } = useCharacterContext();

  const character = characters.find((character) => character.id === Number(id));

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        updateCharacter(data);
      } catch (e) {}
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  return { character, status };
};
