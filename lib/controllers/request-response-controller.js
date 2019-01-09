'use babel'

import AtomRestUIView from '../atom-rest-u-i-view';
import axios from 'axios';

export default class RequestResponseController {

    constructor() {
        this.atomRestUIView = null;
        this.reqView = null;
        this.resView = null;
    }

    /** request needs to be created and sent here
     * @param request: consists of url, header-and body-data, request-type
     */

    sendRequest(request) {
        try {
            request.header = JSON.parse(request.header);
        } catch (e) {
            console.log(e.message);
        }
        switch (request.type) {
            case "GET":
                axios.get(request.url)
                    .then((response) => {
                        // handle success
                        const res = {
                            status: response.status,
                            time: response.request.timeout,
                            jsonData: JSON.stringify(response.data)
                        };
                        this.resView.update({request: request, response: res});
                    })
                    .catch((error) => {
                        this.handleError(error, request);
                    });
                break;

            case "POST":

                axios.post(request.url, JSON.stringify(request.body))
                    .then((response) => {
                        // handle success
                        const res = {
                            status: response.status,
                            time: response.request.timeout,
                            jsonData: JSON.stringify(response.data)
                        };
                        this.resView.update({request: request, response: res});
                    })
                    .catch((error) => {
                        this.handleError(error, request);
                    });
                break;

            case "PUT":

                axios.put(request.url, JSON.stringify(request.body))
                    .then((response) => {
                        // handle success
                        const res = {
                            status: response.status,
                            time: response.request.timeout,
                            jsonData: JSON.stringify(response.data)
                        };
                        this.resView.update({request: request, response: res});
                    })
                    .catch((error) => {
                        this.handleError(error, request);
                    });
                break;

            case "DELETE":
                axios.delete(request.url)
                    .then((response) => {
                        // handle success
                        const res = {
                            status: response.status,
                            time: response.request.timeout,
                            jsonData: JSON.stringify(response.data)
                        };
                        this.resView.update({request: request, response: res});
                    })
                    .catch((error) => {
                        this.handleError(error, request);
                    });
                break;
                
            default:
                break;

        }
    }

    handleError(error, request) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const res = {
                status: error.response.status,
                time: "",
                jsonData: "Request failed with status code: " + error.response.status
            };
            this.resView.update({request: request, response: res});
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            const res = {
                status: error.response.status,
                time: "",
                jsonData: "The request was made but no response was received"
            };
            this.resView.update({request: request, response: res});
        } else {
            // Something happened in setting up the request that triggered an Error
            const res = {status: "", time: "", jsonData: "Whoops, something wrong!"}
            this.resView.update({request: request, response: res});
        }
    }

    initView() {
        this.atomRestUIView = new AtomRestUIView(this);
        this.reqView = this.atomRestUIView.refs.reqView;
        this.resView = this.atomRestUIView.refs.resView;
        return this.atomRestUIView;
    }

    destroy() {
        this.atomRestUIView.destroy();
    }

}
