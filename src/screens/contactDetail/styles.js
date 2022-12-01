import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contactView:{
        flex: 1,
        alignItems: 'center',
        margin: 10,
        height: 670
    },
    contactImage:{
        position: 'absoulte',
        borderRadius: 60,
        height: 220,
        width: 220,
        margin: 50,
    },
    contactText:{
        flexDirection:'row',
    },
    createContactBtns:{
        flexDirection: 'row'
    },
    editContainer:{
        flex:1,
        margin:10,
        width: '90%'
    },
    updateContactHeader: { 
        margin:10,
    },
    editBtn:{
        marginLeft: '30%',
        marginRight: '20%'
    },
    btnText:{
        fontSize:20,
        fontFamily: 'PingFangSC-Thin'
    },
    phoneContainer:{
        marginBottom: 20,
        flexDirection:'row',
        position: 'absolute',
        bottom: 0
    },
    phone:{
        marginLeft: '30%',
        marginRight: '20%'
    },
});