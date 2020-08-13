import React from 'react'
import { Text,
    SectionList,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert,
    View
    } from 'react-native';
import BaseNetwork from '../../../until/axios';
import {URL} from '../../lib/URL';
import CommonStyles from '../../../CommonStyles';
import axios from 'axios'
class FavDetail extends React.Component {

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            loading: true,
            requestId: this.props.route.params.requestId,
            nodeId: this.props.route.params.nodeId,
            lineItemId: this.props.route.params.lineItemId,
            data:[]
        }
    }
    componentDidMount () {
        let {requestId, nodeId, lineItemId} = this.state;
        let param = {
          request_Id: requestId,
          node_Id:  nodeId,
          lineItem_Id: lineItemId,
        }
        // Alert.alert("1");
        // this._networkInstance.postDataRequest(URL.test.getDefaultData, param,(res)=>{
        //     //这里开始不执行
        //     //必须点下模拟器才可以
        //     Alert.alert("ok");
        //     if (res) {
        //         this.setState({
        //             data: res.data,
        //             loading: false
        //         })
        //         console.log(res.data, "###############")
        //     }
        // },(err) => {
        //     console.log("%%%%%%%%%%%%")
        // })
        const server = "http://localhost";
        const port = "8000";
        let serverURL = server +":"+ port;

        this._axios = axios.create({
            baseURL: serverURL,
            timeout: 180000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        });
        this._axios.post(URL.test.getDefaultData, param)
        .then(res => {
            console.log(res)
            this.setState({data: res.data, loading:false});
          }).catch(err => {
            console.log(err);
          })
    }
    renderArticles = () => {

        let articlesComponents = [];
    
        for(let i = 0; i < this.state.data.length; i++)
        {
          let article = this.state.data[i];
          articlesComponents.push(
            <View key={"article-" + i} style={{flexDirection: 'row', flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, paddingVertical: 5}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>{article.attrVal}</Text>
                <Text style={{fontSize: 12}}>{article.attrVal}</Text>
                <Text style={{fontSize: 10, alignSelf: 'flex-end', marginRight: 5}}>{article.result}</Text>
              </View>
            </View>
          );
        }
        return articlesComponents;
      }
    render(){
        if(this.state.loading)
        {
          return(
            <View >
                <ActivityIndicator size="large" color={"#219bd9"}/>
            </View>
          )
        }
        return(
            <ScrollView >
                {this.renderArticles()}
            </ScrollView>
        )
    }
}

export default FavDetail