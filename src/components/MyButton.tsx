import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente funcional MyButton
const MyButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            {/* Ícone à esquerda do texto do botão */}
            <Ionicons name="exit" size={24} color="white" style={styles.icon} />
            {/* Texto do botão */}
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
    );
};

// Estilos do componente MyButton
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row', // Define a direção do layout como linha (horizontal)
        alignItems: 'center', // Alinha os itens verticalmente ao centro
        justifyContent: 'center', // Alinha os itens horizontalmente ao centro
        backgroundColor: '#21A1F9', // Cor de fundo do botão
        borderRadius: 4, // Borda arredondada do botão
        paddingVertical: 10, // Preenchimento vertical
        paddingHorizontal: 20, // Preenchimento horizontal
        marginTop: 20, // Margem superior
    },
    buttonText: {
        color: 'white', // Cor do texto do botão
        fontSize: 16, // Tamanho da fonte do texto do botão
        fontWeight: 'bold', // Peso da fonte do texto do botão
        marginLeft: 5, // Margem à esquerda do texto do botão
    },
    icon: {
        marginRight: 5, // Margem à direita do ícone do botão
    },
});

export default MyButton; // Exporta o componente MyButton