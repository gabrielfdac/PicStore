using System;
using System.Data;
using System.IO;
using System.Web;

namespace TCCPicStore
{
    public partial class RegisterProduct : System.Web.UI.Page
    {
        private dsPicStoreTableAdapters.sp_SelectProductsTableAdapter _taProduct = new dsPicStoreTableAdapters.sp_SelectProductsTableAdapter();
        #region Event Handlers
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Directory.Exists(Server.MapPath("~/upload/productImages")))
            {
                Directory.CreateDirectory(Server.MapPath("~/upload/productImages"));
            }

            if (!IsPostBack)
            {
                FillDropDowns();
            }
        }

        protected void OnRegisterProduct(object sender, EventArgs e)
        {
            try
            {
                //int? productId = DataManager.InsertProduct(_txtProductNumber.Text, Convert.ToInt32(_ddlBundleNumber.SelectedValue), Convert.ToInt32(_ddlMaterial.SelectedValue), _ddlThickness.Text, true, Convert.ToDouble(_txtPrice.Text));
                int? productId = 0;
                _taProduct.sp_InsertProduct(_txtProductNumber.Text, Convert.ToInt32(_ddlBundleNumber.SelectedValue), Convert.ToInt32(_ddlMaterial.SelectedValue), _ddlThickness.Text, true, Convert.ToDouble(_txtPrice.Text), ref productId);

                HttpPostedFile file = Context.Request.Files[0];

                if (file.ContentLength > 0)
                {
                    FileInfo fi = new FileInfo(file.FileName);
                    string extension = fi.Extension.ToLower();
                    if (!(extension.ToLower() != ".jpg" && extension.ToLower() != ".png" && extension.ToLower() != ".gif" && extension.ToLower() != ".img"))
                    {
                        System.Drawing.Image img = new System.Drawing.Bitmap(file.InputStream);
                        System.Drawing.Image resizedimg = ImageUtil.ResizeImage(img, 650, 431);

                        if (!Directory.Exists(Server.MapPath("~/upload/productImages")))
                        {
                            Directory.CreateDirectory("~/upload/productImages");
                        }

                        string dir = Server.MapPath("~/upload/productImages") + "\\";

                        ImageUtil.saveJpeg(dir + productId.ToString() + ".g.jpg", resizedimg, 150);

                        DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/upload/productImages"));

                        if (!di.Exists)
                        {
                            Directory.CreateDirectory(di.FullName);
                        }

                        System.Drawing.Image thumbnail = ImageUtil.ResizeImage(img, 373, 247);
                        ImageUtil.saveJpeg(dir + productId.ToString() + ".p.jpg", thumbnail, 150);

                        Session["info"] = "Image saved successfully!";

                        Clear();

                    }
                    else
                    {
                        Session["info"] = "File type not allowed";
                    }
                }

            }
            catch (Exception)
            {

                throw;
            }
        }


        protected void OnSelection(object sender, EventArgs e)
        {
            if (_ddlMaterial.SelectedValue != "0")
            {
                int id = Convert.ToInt32(_ddlMaterial.SelectedValue);

                foreach (DataRow row in DataManager.GetMaterialById(id).AsEnumerable())
                {
                    Console.WriteLine(row["Composition"]);
                    _txtColor.Value = row["Color"].ToString();
                    _txtComposition.Value = row["Composition"].ToString();
                }
            }
        }

        protected void OnShowModal(object sender, EventArgs e)
        {
            _ModalUpdate.Show();
        }

        protected void OnInsert(object sender, EventArgs e)
        {
            try
            {
                DataManager.InsertBundle(_txtBundleModal.Text);
                //Response.Redirect(Request.RawUrl);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion //Event Handlers

        #region Private Methods
        private void FillDropDowns()
        {
            _ddlMaterial.DataSource = DataManager.GetAllMaterials();
            _ddlMaterial.DataTextField = "MaterialName";
            _ddlMaterial.DataValueField = "idMaterial";
            _ddlMaterial.DataBind();
            _ddlMaterial.Items.Insert(0, "");

            _ddlBundleNumber.DataSource = DataManager.GetBundle(null, 0);
            _ddlBundleNumber.DataTextField = "BundleNumber";
            _ddlBundleNumber.DataValueField = "idBundle";
            _ddlBundleNumber.DataBind();
            _ddlBundleNumber.Items.Insert(0, "");
        }

        private void Clear()
        {
            _txtColor.Value = "";
            _txtComposition.Value = "";
            _txtPrice.Text = "";
            _txtProductNumber.Text = "";
            _ddlBundleNumber.ClearSelection();
            _ddlMaterial.ClearSelection();
            _ddlThickness.ClearSelection();
        }

        #endregion //private methods
    }
}