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
        position: 'absolute',
        width:'110%',
        padding: 10,
        alignItems:'center',
        bottom:0
    },
    btnText:{
        fontSize:16,
        fontFamily: 'PingFangSC-Thin'
    }
});