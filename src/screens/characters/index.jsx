import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import CharacterCard from "../../components/CharacterCard";
import styles from "./characters.module.css";
import CharactersFilters from "../../components/CharactersFilters";
import { useFilters } from "../../hooks/useFilters";
import CharactersFiltersQueryParams from "../../components/CharactersFiltersQueryParams";
import { useFiltersByParams } from "../../hooks/useFiltersByParams";

const Characters = () => {
  const { characters, status } = useFetchCharacters();
  const { filteredCharacters } = useFiltersByParams(characters);
  // const { filteredCharacters, onFiltersApply } = useFilters(characters);

  useFilters();
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
