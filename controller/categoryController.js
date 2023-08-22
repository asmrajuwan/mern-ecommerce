import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req,res) =>{
    try {
        const {name} =req.body;
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }

        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory){
         return res.status(200).send({
                success:true,
                message:"category already exist"
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
            res.status(201).send({
                success:true,
                message:"new category created",
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error in category'
        })
    }

};

export const updateCategoryController =async (req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel
        .findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:"category updated",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error while updating category'
        })
    }
    
}