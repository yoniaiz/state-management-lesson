import CharacterCard from "../../components/CharacterCard";
import styles from "./characters.module.css";
import CharactersFilters from "../../components/CharactersFilters";
import { useFilters } from "../../hooks/useFilters";
import CharactersFiltersQueryParams from "../../components/CharactersFiltersQueryParams";
import { useFiltersByParams } from "../../hooks/useFiltersByParams";
import { useCharacterContext } from "../../context/CharactersContext";
import { useFetchCharactersContext } from "../../hooks/useFetchCharactersContext";
import { useFetchCharacters } from "../../hooks/useFetchCharacters";

const Characters = () => {
  // const { characters, status } = useFetchCharacters();
  useFetchCharactersContext();
  const { status, characters } = useCharacterContext();
  const { filteredCharacters } = useFiltersByParams(characters);
  // const { filteredCharacters, onFiltersApply } = useFilters(characters);

  if (status === "idle" || status === "loading") {
    return <h3>pending</h3>;
  }

  if (status === "success" && characters.length) {
    return (
      <div className={styles.charactersScreenContainer}>
        <CharactersFiltersQueryParams />
        {/* <CharactersFilters onFiltersApply={onFiltersApply} /> */}
        <div className={styles.charactersContainer}>
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      </div>
    );
  }

  return <h3>error</h3>;
};

export default Characters;
