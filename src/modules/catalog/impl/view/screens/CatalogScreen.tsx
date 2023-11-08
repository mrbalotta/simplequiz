import { Card } from "@rneui/themed"
import { Alert } from "react-native"
import { TouchableNativeFeedback } from "react-native"
import { FlatList, SafeAreaView, Text } from "react-native"
import { StyleSheet } from "react-native"


const CatalogItem = (prop: {
        item: {id: number, name: string}, 
        onPress: (item: typeof prop.item) => void
}) => {
    return (
        <Card containerStyle={[styles.card]} wrapperStyle={[styles.cardContent]}>
            <TouchableNativeFeedback onPress={() => prop.onPress(prop.item)}>
                <Text style={[styles.cardText]}>{prop.item.name}</Text>
            </TouchableNativeFeedback>
        </Card>
    )
}

const data = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
]

export function CatalogScreen() {
    const onPress = (item: {id: number, name: string}) => {
        Alert.alert(`Ok, ${item.name}`)
    }
    
    return (
        <SafeAreaView style={[styles.container]}>
            <FlatList 
                data={data}
                renderItem={({item}) => <CatalogItem item={item} onPress={onPress}></CatalogItem>}
                keyExtractor={(item) => `${item.id}`}
                numColumns={2}
                scrollEnabled={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginBottom: 16
    },
    disclaimer: {
        margin: 8,
        fontSize: 20,
        textAlign: 'center'
    },
    border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
    },
    card: {
        flex: 1,
        maxWidth: '50%',
        alignItems: 'center'
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: 60
    },
    cardText: {
        textAlign: 'center',
        fontSize: 20,
    }
})