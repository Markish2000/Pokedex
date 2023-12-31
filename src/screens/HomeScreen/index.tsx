import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {usePokemonPaginated} from '../../hooks/usePokemonPaginated';

import {PokemonCard} from '../../components/PokemonCard';

import {styles} from '../../themes';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();
  return (
    <>
      <Image
        source={require('../../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: 20 + 20,
                color: 'black',
                paddingBottom: 10,
              }}>
              Pokedex
            </Text>
          }
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};
