import { useInject } from "@infra/di/view";
import { PlayNavigation } from "@quiz/play/api/PlayNavigation";
import { Chip } from "@rneui/base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export function HomeScreen() {
    const navigation = useInject<PlayNavigation>("PlayNavigation")

    return (
        <SafeAreaView style={styles.container}>
            <Chip title="START" color={"#D80073"} titleStyle={{fontSize: 30}} style={{flex: 1}} onPress={() => navigation.navigate()}></Chip>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        padding: 16
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