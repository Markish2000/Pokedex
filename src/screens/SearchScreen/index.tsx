import {Platform, View, Text, FlatList, Dimensions} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {usePokemonSearch} from '../../hooks/usePokemonSearch';

import {SearchInput} from '../../components/SearchInput';
import {PokemonCard} from '../../components/PokemonCard';
import {Loading} from '../../components/Loading';

import {styles} from '../../themes';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  if (isFetching) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        data={simplePokemonList}
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
            Pokedex
          </Text>
        }
        keyExtractor={pokemon => pokemon.id}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
