import {Request, Response} from "express";
import ProductModel from "../models/ProductModel";

export default class ProductController {
    static async getProducts(_req: Request , res: Response): Promise<void> {
        try{
            const result = await ProductModel.index();
            if (result[0]){
                res.status(200).json({
                  status: 200,
                  response: {
                    msg: "Retrieved Successfully!",
                    data: result,
                  },
                });
            }
            else{
                res.status(200).json({
                  status: 200,
                  response: {
                    msg: "No Products Were Found!",
                    data: result,
                  },
                });
            }
        }
        catch(err){
            res.status(500).json({status: 500, response: {
                msg: "Opps!, Error",
                data: null
            }})
        }
    }

    static async getProduct(req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id);
            const result = await ProductModel.show(id);
            if (result){
                res.status(200).json({
                    status: 200,
                    response: {
                        msg: "Retrieved Successfully!",
                        data: result,
                    },
                });
            }
            else{
                res.status(200).json({
                    status: 200,
                    response: {
                        msg: "Product Not Found!",
                        data: result,
                    },
                });
            }
            
        }
        catch(err){
            res.status(500).json({
              status: 500,
              response: {
                msg: "Opps!, Error",
                data: null,
              },
            });
        }
    }
    
}
