import {useEffect, useState} from 'react';

import {Platform, View, Text, FlatList, Dimensions} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SearchInput} from '../../components/SearchInput';
import {PokemonCard} from '../../components/PokemonCard';
import {Loading} from '../../components/Loading';

import {usePokemonSearch} from '../../hooks/usePokemonSearch';

import {SimplePokemon} from '../../interfaces/pokemonInterfaces';

import {styles} from '../../themes';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  const {isFetching, simplePokemonList} = usePokemonSearch();

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (term.length === 0) return setPokemonFiltered([]);

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        data={pokemonFiltered}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              color: 'black',
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}>
            {term}
          </Text>
        }
        keyExtractor={pokemon => pokemon.id}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
