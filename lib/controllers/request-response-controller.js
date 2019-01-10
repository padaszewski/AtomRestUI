'use babel'

import AtomRestUIView from '../atom-rest-u-i-view';
import axios from 'axios';

function getTimeDiff(start, end) {
  return end - start;
}

export default class RequestResponseController {

    constructor() {
        this.atomRestUIView = null;
        this.reqView = null;
        this.resView = null;
        this.startTime = 0;
    }


    /** request needs to be created and sent here
     * @param request: consists of url, header-and body-data, request-type
     */

    sendRequest(request) {
      const req = {...request};
        try {
            req.header = JSON.parse(req.header);
        } catch (e) {
            console.log(e.message);
        }

        this.startTime = (new Date()).getTime();
        switch (req.type) {
            case "GET":
                axios.get(req.url)
                    .then((response) => {
                        // handle success
                        const res = this.createViewRes(response.data, response.status);

                        this.showResponse(res);
                    })
                    .catch((error) => {
                        this.handleError(error, req);
                    });
                break;

            case "POST":

                axios.post(req.url, JSON.parse(req.body))
                    .then((response) => {
                        // handle success
                        const res = this.createViewRes(response.data, response.status);
                        this.showResponse(res);
                    })
                    .catch((error) => {
                        this.handleError(error, req);
                    });
                break;

            case "PUT":

                axios.put(req.url, JSON.parse(req.body))
                    .then((response) => {
                        // handle success
                        const res = this.createViewRes(response.data, response.status);
                        this.showResponse(res);
                    })
                    .catch((error) => {
                        this.handleError(error, req);
                    });
                break;

            case "DELETE":
                axios.delete(req.url)
                    .then((response) => {
                        // handle success
                        const res = this.createViewRes(response.data, response.status);
                        this.showResponse(res);
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
            const message = "Request failed with status code: " + error.response.status;
            const res = this.createViewRes(message, error.response.status);
            this.showResponse(res);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            const message = "The request was made but no response was received"
            const res = this.createViewRes(message, error.response.status);
            this.showResponse(res);
        } else {
            // Something happened in setting up the request that triggered an Error
            const message = "Whoops, something wrong!";
            const res = this.createViewRes(message, "");
            this.showResponse(res);
        }
    }

    showResponse(res) {
      this.resView.update({response: res});
    }

    createViewRes(resData, status) {
      return {
        time: getTimeDiff(this.startTime, (new Date).getTime()),
        status: status,
        jsonData: JSON.stringify(resData)
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
