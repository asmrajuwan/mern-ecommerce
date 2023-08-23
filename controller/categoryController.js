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
    
};

export const getCategories = async(req,res)=>{
try {
    const categories = await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"All categories list",
        categories
    })
} catch (error) {
    
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message:'Error while getting all category'
    })
}
};

export const getCategoryBySlug = async(req,res) =>{
    try {
        
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get Single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error while getting a category'
        })
    }
};

export const deleteCategoryById = async (req,res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Deleted Single category",
            
        })
        
    } catch (error) {
        onsole.log(error)
        res.status(500).send({
            success: false,
           
            message:'Error while deleting a category',
            error,
        })
    }
}