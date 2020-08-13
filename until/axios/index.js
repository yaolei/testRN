import React from 'react';
import Axios from 'axios';

Axios.defaults.withCredentials = true;
const server = "http://localhost";
const port = "8000";
let url = server +":"+port;

export default class BaseNetwork {
    _axios = null;
    constructor(props) {
        // let baseURL = document.location.origin;
        let serverURL = url;
        let patchPar = '/';
        // let serverURL = baseURL + patchPar +this._APIVersion;
        this._axios = Axios.create({
            baseURL: serverURL,
            timeout: 180000,
            // headers: {'Csrf-Token':'nocheck'}
            headers: {
                'Content-Type': 'application/json',
            },
            Accept:'application/json'
        });
        // this._errorHandler = BaseErrorHandler.getErrorHandler();
        this.requestToken={};
    }

    /**
     * set an OAuth-Token to the http header
     * @param token
     */
    setOAuthToken(token) {
        this._axios.defaults.headers.common['OAuth-Token'] = token;
    }
    /**
     * Send a GET request
     * @param url
     * @param parameter
     * @param success
     * @param failed
     * @return {CancelTokenSource}
     */
    getDataRequest(url, parameter, success, failed) {
        if(this.requestToken[url]){
            this.requestToken[url].cancel('cancel for repeat request');
            this.requestToken[url] = 0;
        }
        let CancelToken = Axios.CancelToken;
        let source = CancelToken.source();
        let self = this;

        this._axios.get(
            url,
            {
                cancelToken: source.token,
                params: parameter,
            }
        )
            .then(function (response) {
                if (success) {
                    success(response);
                }
            })
            .catch(function (error) {
                if(error){
                    // Cookies.set('at','');
                    self.setOAuthToken('');
                }else{
                    if (failed) {
                        failed(error);
                    }
                }
            });
        this.requestToken[url] = source;
        return source;
    }
    /**
     * @desc send network request
     * @param url suffix is enough
     * @param parameter format is {ID:123, Name:'abc'}
     * @param success call back function for success
     * @param failed call back function for failed
     * @returns {{token, cancel}} cancel function for cancel request
     */


    postDataRequest(url, parameter, success, failed, cancelParam) {
        if(this.requestToken[url] && !cancelParam){
            this.requestToken[url].cancel('cancel for repeat request');
            this.requestToken[url] = 0;
        }
        this._reqCounter = this._reqCounter++ % 20000;
        let CancelToken = Axios.CancelToken;
        let source = CancelToken.source();
        let self = this;
        this._axios.post(
            url,
            parameter,
            {cancelToken: source.token}
        )
            .then(function (response) {
                if (success) {
                    success(response);
                }
            })
            .catch(function (error) {
                if(error ){
                    self.setOAuthToken('');
                }else{
                    if (failed) {
                        failed(error);
                    }
                }
            });
        this.requestToken[url] = source;
        return source;
    }
}
let _sharedNetworkInstance = null;
BaseNetwork.getNetWorkInstance = () => {
    if (!_sharedNetworkInstance) {
        _sharedNetworkInstance = new BaseNetwork();
    }
    return _sharedNetworkInstance;
};