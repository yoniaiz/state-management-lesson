import { createContext, useContext, useState } from "react";

const CharactersContext = createContext({
  status: "idle",
  characters: [],
});

const CharacterContextProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [characters, setCharacters] = useState([]);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const updateCharacters = (characters) => {
    setCharacters(characters);
  };

  const updateCharacter = (character) => {
    if (characters.length) {
      setCharacters((prev) =>
        prev.map((prevCharacter) => {
          if (prevCharacter.id === characters.id) {
            return character;
          }

          return prevCharacter;
        })
      );
    } else {
      setStatus("success");
      setCharacters([character]);
    }
  };

  return (
    <CharactersContext.Provider
      value={{
        status,
        characters,
        updateCharacters,
        updateCharacter,
        updateStatus,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacterContext = () => useContext(CharactersContext);

export default CharacterContextProvider;
