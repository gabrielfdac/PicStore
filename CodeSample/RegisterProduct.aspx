<%@ Page Title="" Language="C#" MasterPageFile="~/TCCPicSore.Master" AutoEventWireup="true" CodeBehind="RegisterProduct.aspx.cs" Inherits="TCCPicStore.RegisterProduct" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
    <link href="css/formStyles.css" rel="stylesheet" />
	<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="js/RegisterScript.js"></script>
    <script src="js/Validate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphSlider" runat="server">
    <section id="form">
		<div class="container">
            <div class="breadcrumbs">
		        <ol class="breadcrumb">
			        <li><a href="#">Admin</a></li>
			        <li class="active">Register Product</li>
		        </ol>
	        </div>
			<div class="row">
				<div class="col-sm-12">
                    <form id="formProduct" runat="server">
                        <div id="formdiv">
                            <h2 class="bigTitle text-center">Register Product</h2>
                            <div class="row">
                                <div class="form-group has-feedback col-xs-4">
								    <label class="control-label" for="_txtProductN">Product Number</label>
								    <asp:TextBox CssClass="form-control" runat="server" ID="_txtProductNumber"/>
								    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
								    <span class="message hide"></span>
							    </div>
                                <div class="form-group has-feedback col-xs-3">
								    <label class="control-label" for="_txtPrice">Price</label>
                                    <asp:TextBox CssClass="form-control" ID="_txtPrice" runat="server"></asp:TextBox>
								    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
								    <span class="message hide"></span>
							    </div>
                                <div class="form-group has-feedback col-xs-3">
								    <label class="control-label" for="_ddlBundleNumber">Bundle Number</label>
								    <asp:DropDownList ID="_ddlBundleNumber" CssClass="form-control" runat="server" Style="width:83.5%"></asp:DropDownList>                                    
								    <span style="right:47px;" class="glyphicon form-control-feedback feedback-select" aria-hidden="true"></span>
								    <span class="message hide"></span>
							    </div>
                                <div class="AddBundleWrapper">
                                    <asp:Button ID="_AddBundle" runat="server" Text="+" data-toggle="tooltip" title="Add Bundle" OnClick="OnShowModal" />
                                </div>
                                <div class="form-group has-feedback col-xs-2">
								    <label class="control-label" for="_ddlThickness">Thickness</label>
								    <asp:DropDownList ID="_ddlThickness" CssClass="form-control" runat="server">
                                        <asp:ListItem Text="" />
                                        <asp:ListItem Text="2cm" />
                                        <asp:ListItem Text="3cm" />
                                    </asp:DropDownList>
								    <span class="glyphicon form-control-feedback feedback-select" aria-hidden="true"></span>
								    <span class="message hide"></span>
							    </div>
                            </div>
                            <asp:ScriptManager ID="ScriptManager2" runat="server"></asp:ScriptManager>
                            <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
                                <ContentTemplate>
                                    <div class="row">
                                        <div class="form-group has-feedback col-xs-4">
								            <label class="control-label" for="_ddlMaterial">Material</label>
								             <asp:DropDownList ID="_ddlMaterial" CssClass="form-control" runat="server" AutoPostBack="true" EnableViewState="true" OnSelectedIndexChanged="OnSelection"></asp:DropDownList>
								            <span class="glyphicon form-control-feedback feedback-select" aria-hidden="true"></span>
								            <span class="message hide"></span>
							            </div>
                                        <div class="form-group has-feedback col-xs-4">
								            <label class="control-label" for="_txtColor">Color</label>
								            <input type="text" style="width:100%;" class="form-control" placeholder="Select a material" runat="server" id="_txtColor" disabled />
								            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
								            <span class="message hide"></span>
							            </div>
                                        <div class="form-group has-feedback col-xs-4">
								            <label class="control-label" for="_txtComposition">Composition</label>
								            <input type="text" style="width:100%;" class="form-control" placeholder="Select a material" runat="server" id="_txtComposition" disabled />
								            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
								            <span class="message hide"></span>
							            </div>
                                    </div>
                                </ContentTemplate>
                                <Triggers>
                                    <asp:AsyncPostbackTrigger ControlID="_ddlMaterial" EventName="SelectedIndexChanged" />
                                </Triggers>
                            </asp:UpdatePanel> 
                            <div class="form-group has-feedback">
								<label class="control-label" for="_FileField00">Image File</label>
								<input type="file" id="_FileField00" class="FileField" name="FileField00" runat="server" />
                                <span class="hide"></span>
								<span class="message hide"></span>
							</div>
                            <button id="_btnClear" class="pull-left btn btn-default" type="button">Clear</button>
							<button id="_btnSignup" class="pull-left btn btn-default" type="button">Register</button>
							<div style="display:none">
								<asp:Button ID="hiddenBtn" CssClass="pull-left btn btn-default" OnClick="OnRegisterProduct" runat="server" Text="Signup" />
							</div>
                            <br />
                            <br />
                        </div>

                         <div style="display: none">
<%--                            <asp:ScriptManager ID="ScriptManager1" runat="server">
                            </asp:ScriptManager>--%>
                            <asp:HyperLink ID="linkModal" runat="server">HyperLink</asp:HyperLink>
                        </div>
                        <cc1:modalpopupextender id="_ModalUpdate" runat="server" targetcontrolid="linkModal" popupcontrolid="_PanelModal"></cc1:modalpopupextender>

                        <asp:Panel ID="_PanelModal" runat="server">
                            <div id="_PanelWrapper">
                                <div id="_PanelHeader"">Add Bundle</div>
                                <div id="_PanelContent">
                                    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
                                        <ContentTemplate>
                                            <div class="row">
                                                <div class="form-group col-xs-12">
                                                    <label class="control-label" for="_txtBundleModal">Bundle Number</label>
                                                    <asp:TextBox ID="_txtBundleModal" CssClass="form-control" runat="server" />
                                                </div>
                                            </div>
                                        </ContentTemplate>
                                        <Triggers>
                                            <asp:PostBackTrigger ControlID="_SaveModal" />
                                        </Triggers>
                                    </asp:UpdatePanel>
                                    <div class="Button">
                                        <asp:Button ID="_btnCancel" CssClass="pull-left btn btn-default" runat="server" Text="Cancelar" />
                                        <asp:Button ID="_SaveModal" CssClass="pull-left btn btn-default" runat="server" Text="Salvar" OnClick="OnInsert" />
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </asp:Panel>

                    </form>
                    </div>
			</div>
		</div>
	</section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphFilters" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cphConteudo" runat="server">
</asp:Content>

