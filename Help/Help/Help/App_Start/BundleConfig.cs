using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;
using System.Web;
using System.Web.Optimization;

namespace Help
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //This setting is used when if you have specfied the path Using System.web.Optimization.bundle.Cdnpath then it will try to fetch data from there first
            bundles.UseCdn = true;
            //NullBuilder class is responsible for prevention of early applying of the item transformations and combining of code.
            var nullBuilder = new NullBuilder();
            //StyleTransformer and ScriptTransformer classes produce processing of stylesheets and scripts.
            var styleTransformer = new StyleTransformer();

            var scriptTransformer = new ScriptTransformer();
            //NullOrderer class disables the built-in sorting mechanism and save assets sorted in the order they are declared.
            var nullOrderer = new NullOrderer();
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Content/js/jquery-migrate-1.2.1.js",
            //            "~/Content/js/jquery-ui.js",
            //            //"~/Content/vendors/calendar/calendar.js",
            //            "~/Scripts/Validations.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrapscript").Include(
                       "~/Content/vendors/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js",
                       "~/Content/vendors/metisMenu/jquery.metisMenu.js",
                       "~/Content/vendors/slimScroll/jquery.slimscroll.js",
                       "~/Content/vendors/jquery-cookie/jquery.cookie.js"
                       ));
            bundles.Add(new ScriptBundle("~/bundles/customscript").Include(
                     "~/Content/js/jquery.menu.js",
                       "~/Content/vendors/responsive-tabs/responsive-tabs.js",
                       "~/Content/vendors/moment/moment.js",
                       "~/Content/vendors/bootstrap-daterangepicker/daterangepicker.js",
                       "~/Content/js/main.js",
                       "~/Scripts/jquery.blockUI.js",
                       "~/Content/vendors/DataTables/media/js/jquery.dataTables.js",
                       "~/Content/vendors/DataTables/media/js/dataTables.bootstrap.js"
                      ));
            bundles.Add(new StyleBundle("~/Content/css/theme").Include("~/Content/css/theme_style.css"));
            bundles.Add(new ScriptBundle("~/bundles/custscript").Include(
                       "~/Content/js/table-datatables.js",
                       "~/Scripts/jquery.mask.js"));
            bundles.Add(new ScriptBundle("~/Content/highcharts").Include("~/Content/vendors/jquery-highcharts/highcharts.js",
                       "~/Content/vendors/jquery-highcharts/highcharts-more.js",
                       "~/Content/vendors/jquery-highcharts/exporting.js",
                       "~/Scripts/offline-exporting.js",
                       "~/Content/js/charts-highchart-area.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/vendors/DataTables/media/css/jquery.dataTables.css",
                "~/Content/vendors/Datatables/media/css/dataTables.bootstrap.css",
                "~/Content/vendors/iCheck/skins/all.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
            bundles.Add(new ScriptBundle("~/bundles/Scripts/kendo/kendojs").Include(
       "~/Scripts/kendo/kendo.all.min.js",
                // "~/Scripts/kendo/kendo.timezones.min.js", // uncomment if using the Scheduler
       "~/Scripts/kendo/kendo.aspnetmvc.min.js"));
            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
            "~/Content/kendo/kendo.common.min.css",
            "~/Content/kendo/kendo.default.min.css"));
            bundles.Add(new ScriptBundle("~/bundles/Scripts/tinymce/tinymcejs").Include(
                "~/Scripts/tinymce/plugins/colorpicker/plugin.min.js",
                "~/Scripts/tinymce/plugins/imagetools/plugin.min.js",
                "~/Scripts/tinymce/plugins/textpattern/plugin.min.js",
                "~/Scripts/tinymce/plugins/textcolor/plugin.min.js",
                "~/Scripts/tinymce/plugins/paste/plugin.min.js",
                "~/Scripts/tinymce/plugins/template/plugin.min.js",
                "~/Scripts/tinymce/plugins/emoticons/plugin.min.js",
                "~/Scripts/tinymce/plugins/directionality/plugin.min.js",
                "~/Scripts/tinymce/plugins/contextmenu/plugin.min.js",
                "~/Scripts/tinymce/plugins/table/plugin.min.js",
                "~/Scripts/tinymce/plugins/nonbreaking/plugin.min.js",
                "~/Scripts/tinymce/plugins/media/plugin.min.js",
                "~/Scripts/tinymce/plugins/save/plugin.min.js",
                "~/Scripts/tinymce/plugins/insertdatetime/plugin.min.js",
                "~/Scripts/tinymce/plugins/fullscreen/plugin.min.js",
                "~/Scripts/tinymce/plugins/code/plugin.min.js",
                "~/Scripts/tinymce/plugins/visualchars/plugin.min.js",
                "~/Scripts/tinymce/plugins/visualblocks/plugin.min.js",
                "~/Scripts/tinymce/plugins/wordcount/plugin.min.js",
                "~/Scripts/tinymce/plugins/searchreplace/plugin.min.js",
                "~/Scripts/tinymce/plugins/pagebreak/plugin.min.js",
                "~/Scripts/tinymce/plugins/anchor/plugin.min.js",
                "~/Scripts/tinymce/plugins/hr/plugin.min.js",
                "~/Scripts/tinymce/plugins/preview/plugin.min.js",
                "~/Scripts/tinymce/plugins/print/plugin.min.js",
                "~/Scripts/tinymce/plugins/charmap/plugin.min.js",
                "~/Scripts/tinymce/plugins/link/plugin.min.js",
                "~/Scripts/tinymce/plugins/lists/plugin.min.js",
                "~/Scripts/tinymce/plugins/image/plugin.min.js",
                "~/Scripts/tinymce/plugins/autolink/plugin.min.js",
                "~/Scripts/tinymce/plugins/advlist/plugin.min.js",
                "~/Scripts/tinymce/plugins/modern/plugin.min.js",
                "~/Scripts/tinymce/plugins/moxiemanager/js/moxman.api.min.js",
                "~/Scripts/tinymce/plugins/moxiemanager/editor_plugin.js",
                "~/Scripts/tinymce/plugins/moxiemanager/editor_plugin_src.js",
                "~/Scripts/tinymce/plugins/moxiemanager/plugin.min.js",
                "~/Scripts/tinymce/themes/modern/theme.min.js"));

            var scriptbundleToObfuscate = new ScriptBundle("~/bundles/jquery") { Builder = nullBuilder, Orderer = nullOrderer };
            scriptbundleToObfuscate.Include("~/Content/js/jquery-migrate-1.2.1.js",
                        "~/Content/js/jquery-ui.js",
                        "~/Scripts/Validations.js");
            scriptbundleToObfuscate.Transforms.Add(scriptTransformer);
            bundles.Add(scriptbundleToObfuscate);
        }
    }
}
