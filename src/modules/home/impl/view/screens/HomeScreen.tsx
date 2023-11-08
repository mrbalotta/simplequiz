import { Card } from "@rneui/base";
import { ScrollView } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { Alert } from "react-native";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export function HomeScreen() {
    const onPressButton = () => {
        Alert.alert('You tapped the button!');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                    <Card containerStyle={styles.card} wrapperStyle={styles.cardContent}>
                        <TouchableNativeFeedback onPress={onPressButton}>
                            <Text style={styles.cardTitle}>Challenge Mode</Text>
                        </TouchableNativeFeedback>
                    </Card>
                
                    <Card containerStyle={styles.card} wrapperStyle={styles.cardContent}>
                        <TouchableNativeFeedback onPress={onPressButton}>
                            <Text style={styles.cardTitle}>Campaign Mode</Text>
                        </TouchableNativeFeedback>
                    </Card> 

                    <Card containerStyle={styles.card} wrapperStyle={styles.cardContent}>
                        <TouchableNativeFeedback onPress={onPressButton}>
                            <Text style={[styles.cardTitle]}>Achievements</Text>
                        </TouchableNativeFeedback>
                    </Card> 

                    <Card containerStyle={styles.card} wrapperStyle={styles.cardContent}>
                        <TouchableNativeFeedback onPress={onPressButton}>
                            <Text style={[styles.cardTitle]}>Help</Text>
                        </TouchableNativeFeedback>
                    </Card> 
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderRadius: 10,
        width: '65%',
        minHeight: 130
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 35,
    },
    border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
    }
})