import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

// Define o tipo de props esperado para o componente MyTextInput
interface MyTextInputProps extends TextInputProps {
    value: string; // Valor do TextInput
    onChangeText: (text: string) => void; // Função chamada quando o texto muda
    placeholder: string; // Texto exibido quando o TextInput está vazio
}

// Componente funcional MyTextInput
const MyTextInput = ({ value, onChangeText, placeholder, ...rest }: MyTextInputProps) => {
    return (
        <View style={styles.container}>
            {/* TextInput para entrada de texto */}
            <TextInput
                value={value} // Valor do TextInput
                onChangeText={onChangeText} // Função chamada quando o texto muda
                placeholder={placeholder} // Texto exibido quando o TextInput está vazio
                style={styles.input} // Estilo do TextInput
                {...rest} // Outras propriedades passadas ao TextInput
            />
        </View>
    );
};

// Estilos do componente MyTextInput
const styles = StyleSheet.create({
    container: {
        marginVertical: 10, // Margem vertical ao redor do TextInput
    },
    input: {
        borderBottomWidth: 1, // Adiciona uma borda na parte inferior do TextInput
        borderColor: '#ccc', // Cor da borda do TextInput
        padding: 10, // Preenchimento interno do TextInput
        color: '#ccc', // Cor do texto do TextInput
    },
});

export default MyTextInput; // Exporta o componente MyTextInput